import { Chip, Input, Paper, createStyles, makeStyles } from '@material-ui/core'
import React, { useCallback } from 'react'

import ExpandingInput from './ExpandingInput'
import { useField } from 'formik'

interface Props {
  name: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
)

const TagInput: React.FC<Props> = props => {
  const classes = useStyles()
  const [{ name, value: tags, onChange, onBlur, ...bind }] = useField<string[]>(
    {
      ...props,
      multiple: true,
    }
  )

  const setTags = useCallback(
    (value: string[]) => {
      onChange({
        target: {
          name,
          value,
        },
      })
    },
    [name, onChange]
  )

  return (
    <Paper component="ul" className={classes.container}>
      {tags.slice(undefined, -1).map((tag, index) => (
        <Chip
          key={index}
          className={classes.chip}
          label={tag}
          onDelete={() => {
            const newTags = [...tags]
            newTags.splice(index, 1)
            setTags(newTags)
          }}
        />
      ))}
      <Chip
        key={tags.length - 1}
        className={classes.chip}
        label={
          <Input
            value={tags.slice(-1)[0]}
            inputComponent={ExpandingInput}
            name={name}
            {...bind}
            onChange={({ target }) =>
              setTags([...tags.slice(undefined, -1), target.value])
            }
          />
        }
      />
      {!!(tags.length && tags.slice(-1)[0] !== '') && (
        <Chip
          key={tags.length}
          className={classes.chip}
          label={
            <Input
              value=""
              inputComponent={ExpandingInput}
              name={name}
              onChange={({ target }) => setTags([...tags, target.value])}
            />
          }
        />
      )}
    </Paper>
  )
}

export default TagInput
