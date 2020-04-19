import * as yup from 'yup'

import { accountSchema, newAccountSchema } from './account'

describe('accountSchema', () => {
  it('should accept a valid account', async () => {
    expect(
      await accountSchema.isValid({
        email: 'user@example.com',
        password: '12345678',
      })
    ).toBeTruthy()
  })
  it('should reject an invalid account email', async () => {
    expect(
      await accountSchema.isValid({
        email: 'user@@example.com',
        password: '12345678',
      })
    ).toBeFalsy()
  })
  it('should reject a short password', async () => {
    expect(
      await accountSchema.isValid({
        email: 'user@example.com',
        password: '1234567',
      })
    ).toBeFalsy()
  })
})

describe('newAccountSchema', () => {
  it('should accept a valid new account', async () => {
    expect(
      await newAccountSchema.isValid({
        email: 'user@example.com',
        password: '12345678',
        confirmPassword: '12345678',
      })
    ).toBeTruthy()
  })
  it('should reject an invalid account email', async () => {
    expect(
      await newAccountSchema.isValid({
        email: 'user@@example.com',
        password: '12345678',
        confirmPassword: '12345678',
      })
    ).toBeFalsy()
  })
  it('should reject a missing password confirmation', async () => {
    expect(
      await newAccountSchema.isValid({
        email: 'user@example.com',
        password: '12345678',
      })
    ).toBeFalsy()
  })
  it('should reject a mismatched password confirmation', async () => {
    expect(
      await newAccountSchema.isValid({
        email: 'user@example.com',
        password: '12345678',
        confirmPassword: '11111111',
      })
    ).toBeFalsy()
  })
})
