import React, { useEffect } from 'react'
import {
  RecipeListState,
  getFromCouch,
  shuffleRecipes,
} from '../features/recipes/recipeSlice'

import Authentication from 'pouchdb-authentication'
import PouchDB from 'pouchdb'
import { RootState } from 'app/rootReducer'
import { Store } from 'app/store'
import Upsert from 'pouchdb-upsert'
import { observeStore } from 'util/redux'
import { testAwait } from 'util/test'
import { useHistory } from 'react-router-dom'
import { useStore } from 'react-redux'
import { utf8ToHex } from 'util/utf8tools'

PouchDB.plugin(Upsert)
PouchDB.plugin(Authentication)

export interface DbConfig {
  host: string
  port: number
}

export const DBCONFIG: Readonly<DbConfig> = {
  host: process.env.REACT_APP_COUCHDB_HOST || 'http://localhost',
  port:
    (process.env.REACT_APP_COUCHDB_PORT &&
      // Port 0 and '' are invalid, so || is preferred
      parseInt(process.env.REACT_APP_COUCHDB_PORT)) ||
    5984,
}
export const LOCAL_DB_NAME = 'cards' as const

export const remoteAuth = new PouchDB<never>(
  `${DBCONFIG.host}:${DBCONFIG.port}`,
  {
    skip_setup: true,
  }
)

export interface Model {
  state: Omit<RootState['recipes']['recipes'], 'rehydrated'>
}

const shuffleSalt = Date.now()

/**
 * The name of the couchdb doc the state is stored in.
 *
 * Not related to the `state` in `Model`.
 */
const STATE_DOC = 'State' as const

/**
 * Tries enable sync for remote couch, local pouch, and redux.
 *
 * Throws if a valid auth isn't available in session.
 */
export const init = async (store: Store) => {
  const db = new PouchDB<Model>(LOCAL_DB_NAME)

  const session = await remoteAuth.getSession()
  const remote = new PouchDB<Model>(
    `${DBCONFIG.host}:${DBCONFIG.port}/userdb-${utf8ToHex(
      session.userCtx.name
    )}`
  )

  try {
    const storedLocalState = await db.get(STATE_DOC)
    store.dispatch(getFromCouch(storedLocalState))
  } catch (e) {
    await db.sync(remote)
    const storedLocalState = await db.get(STATE_DOC)
    store.dispatch(getFromCouch(storedLocalState))
  }
  store.dispatch(shuffleRecipes(shuffleSalt))

  // Sync remote
  db.sync(remote, {
    live: true,
    retry: true,
  }).on('change', change => store.dispatch(getFromCouch(change.change.docs[0])))

  observeStore<Store, RecipeListState>(
    store,
    state =>
      testAwait(
        (async state => {
          try {
            await db.upsert(STATE_DOC, oldstate => ({
              ...oldstate,
              state,
            }))
          } catch (error) {
            console.error(error)
          }

          return db
        })(state)
      ),
    state => state.recipes.recipes
  )
}

/**
 * A component to own the db subscriptions and manage lifecycle
 *
 */
export const DbOwner: React.FC = () => {
    const store = useStore()
    const history = useHistory()

    useEffect(() => {
      let cancelled = false
      testAwait(
        (async () => {
          try {
            await init(store)
          } catch (e) {
            console.log(e)
            if (!cancelled) history.replace('/login')
          }
        })()
      )
      return () => void (cancelled = true)
    }, [history, store])
    return null
  }

  // XXX testing, remove
;(window as any).pouchdb = PouchDB
;(window as any).cfg = DBCONFIG
