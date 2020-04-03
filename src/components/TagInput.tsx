import { Box, Chip, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'
import React from 'react'

interface Props {
  recipeTags: string[]
  setRecipeTags: (tags: string[]) => unknown
}

const TagInput: React.FC<Props> = ({ recipeTags, setRecipeTags }) => (
  <Box>
    <Autocomplete
      multiple
      freeSolo
      renderTags={(value = { recipeTags }, getTagProps) =>
        value.map((option: React.ReactNode, index: any) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      onChange={(_, newValue: string[]) => setRecipeTags(newValue)}
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
  </Box>
)

export default TagInput
