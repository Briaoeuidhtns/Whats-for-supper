const testPromises: Promise<void>[] = []

export const testAwait = (p: Promise<void>) => {
  if (process.env.NODE_ENV !== 'production') testPromises.push(p)
}

export const pending = () => Promise.all(testPromises)
