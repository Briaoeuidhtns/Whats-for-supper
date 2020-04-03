export const isPouchDBError = (
  result: PouchDB.Core.Error | any
): result is PouchDB.Core.Error => {
  return !!(result as PouchDB.Core.Error).error
}
