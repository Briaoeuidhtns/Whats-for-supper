import { Chip, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
}

const TagInput: React.FC<Props> = ({ name }) => {
  const [bindForm] = useField<string[]>({
    name,
    type: 'input',
    multiple: true,
  })

  return (
    <Autocomplete
      {...bindForm}
      freeSolo
      renderTags={(value: React.ReactNode[], getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label="Recipe Tags"
          placeholder=" "
          fullWidth
        />
      )}
    />
  )
}

export default TagInput
