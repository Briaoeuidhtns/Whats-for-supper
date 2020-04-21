import { utf8ToHex } from 'util/utf8tools'

describe('utf8 to hex', () => {
  it('handles basic ascii to hex', () => {
    expect(utf8ToHex('batman')).toEqual('6261746d616e')
  })
  it('handles edge case conversion', () => {
    expect(utf8ToHex('守护村子')).toEqual('e5ae88e68aa4e69d91e5ad90')
  })
})
