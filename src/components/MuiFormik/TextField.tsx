import { TextField, TextFieldProps } from '@material-ui/core'

import React from 'react'
import { useField } from 'formik'

const FormikTextField: React.FC<Omit<TextFieldProps, 'value'> & {
  name: string
}> = ({ name, helperText, variant, type = 'input', ...props }) => {
  const [bindField, { touched, error }] = useField<string>({
    name,
    type,
  })
  const showError = touched && !!error

  // variant on a particular TextField doesn't get inferred as a union like props
  // Since different variant => different supported props
  // but by here props have already been checked against declared TextFieldProps, so should be safe
  return (
    <TextField
      {...props}
      type={type}
      {...bindField}
      variant={variant as any}
      error={showError}
      helperText={showError ? error : helperText}
    />
  )
}

export default FormikTextField
