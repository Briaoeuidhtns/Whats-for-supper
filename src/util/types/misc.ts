// To defeat type widening for arrays with specific types in specific indices
export const tuple = <T extends any[]>(...data: T) => data
