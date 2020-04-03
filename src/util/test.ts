const testPromises: Promise<unknown>[] = []

export const testAwait = (p: Promise<unknown>) => {
  if (process.env.NODE_ENV !== 'production') testPromises.push(p)
}

export const pending = () => Promise.all(testPromises)
