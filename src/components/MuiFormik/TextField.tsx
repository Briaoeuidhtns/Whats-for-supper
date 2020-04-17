import { TextField, TextFieldProps } from '@material-ui/core'

import React from 'react'
import { useField } from 'formik'

const FormikRating: React.FC<Omit<TextFieldProps, 'value'> & {
  name: string
}> = ({ name, helperText, variant, ...props }) => {
  const [bindField, { touched, error }] = useField<string>({
    name,
    type: 'input',
  })
  const showError = touched && !!error

  return (
    <TextField
      {...props}
      {...bindField}
      error={showError}
      helperText={showError ? error : helperText}
    />
  )
}

export default FormikRating
