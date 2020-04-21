const testPromises: Promise<unknown>[] = []

/**
 * Register a promise without a clear parent so it can be awaited during tests
 *
 * No op in production
 */
export const testAwait = (p: Promise<unknown>) => {
  if (process.env.NODE_ENV !== 'production') testPromises.push(p)
  return p
}

export const pending = () => Promise.all(testPromises)
