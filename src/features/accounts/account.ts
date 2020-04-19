import * as yup from 'yup'

export const accountSchema = yup.object({
  email: yup
    .string()
    .email()
    .required('An email address is required'),
  password: yup
    .string()
    .required('A password is required')
    .min(8, 'Passwords must be at least 8 characters')
    .max(128, "Getting a little carried away there, don't you think?"),
})
export type Account = yup.InferType<typeof accountSchema>

/**
 * Schema for validating new accounts.
 * Has a confirmation field that should be removed
 *
 * yup has .strip(), although I can't get it to validate propertly
 */
export const newAccountSchema = accountSchema.shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
})
export type NewAccount = yup.InferType<typeof newAccountSchema>
