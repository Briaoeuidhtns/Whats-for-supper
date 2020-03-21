import { observeStore } from 'util/redux'
import { testAwait } from 'util/test'
import { Store } from 'app/store'
import { RootState } from 'app/rootReducer'
import { isPouchDBError } from 'util/types/pouchdb'
import PouchDB from 'pouchdb'
import Upsert from 'pouchdb-upsert'
import {
  shuffleRecipes,
  getFromCouch,
  addDefaultRecipes,
  RecipeListState,
} from '../features/recipes/recipeSlice'

PouchDB.plugin(Upsert)

export interface Model {
  state: Omit<RootState['recipes'], 'rehydrated'>
}

const shuffleSalt = Date.now()

const STATE_DOC = 'State' as const

export const init = async (
  store: Store,
  { host = 'http://localhost', port = 5984, name = 'cards' } = {}
) => {
  const db = new PouchDB<Model>(name)
  // Initial get
  try {
    const dbget = await db.get(STATE_DOC)
    store.dispatch(getFromCouch(dbget))
  } catch (e) {
    if (isPouchDBError(e) && e.status === 404) {
      store.dispatch(addDefaultRecipes())
    } else throw e
  }
  store.dispatch(shuffleRecipes(shuffleSalt))

  // Sync remote
  db.sync<Model>(`${host}:${port}/${name}`, {
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
            if (isPouchDBError(error)) console.error(error)
            throw error
          }

          return db
        })(state)
      ),
    state => state.recipes
  )
}
