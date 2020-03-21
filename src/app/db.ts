import { observeStore } from 'util/redux'
import { testAwait } from 'util/test'
import { Store } from 'redux'
import { RootState } from 'app/rootReducer'
import { isPouchDBError } from 'util/types/pouchdb'
import PouchDB from 'pouchdb'
import Upsert from 'pouchdb-upsert'
import {
  shuffleRecipes,
  getFromCouch,
  addDefaultRecipes,
} from '../features/recipes/recipeSlice'

PouchDB.plugin(Upsert)

export interface Model {
  state: RootState
}

const shuffleSalt = Date.now()

export const init = async (
  store: Store,
  { host = 'http://localhost', port = 5984, name = 'cards' } = {}
) => {
  const db = new PouchDB<Model>(name)
  // Initial get
  try {
    const dbget = await db.get('State')
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

  const syncLocal = async (state: RootState) => {
    try {
      await db.upsert('State', oldstate => ({
        ...oldstate,
        state,
      }))
    } catch (error) {
      if (isPouchDBError(error)) console.error(error)
      throw error
    }

    return db
  }

  observeStore(store, state => testAwait(syncLocal(state)))
}
