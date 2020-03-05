import { tuple } from './misc'

// Not a useful test to run, but still type checked
it('correctly infers tuple type', () => {
  const [mNumber, mString] = (() => tuple(1, 'test'))()
  expect<number>(mNumber)
  expect<string>(mString)
})
