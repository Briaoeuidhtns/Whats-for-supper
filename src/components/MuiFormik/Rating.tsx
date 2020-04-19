import { FormControl, FormControlLabel, makeStyles } from '@material-ui/core'
import { Rating, RatingProps } from '@material-ui/lab'

import React from 'react'
import { useField } from 'formik'

const useStyles = makeStyles({ label: { alignItems: 'start', marginLeft: 0 } })

const FormikRating: React.FC<Omit<RatingProps, 'value'> & {
  name: string
  label: React.ReactNode
  margin?: 'none' | 'dense' | 'normal'
}> = ({ name, label, margin, ...props }) => {
  const classes = useStyles()
  const [bindField] = useField<number>({
    name,
    type: 'number',
  })
  return (
    <FormControl margin={margin}>
      <FormControlLabel
        className={classes.label}
        labelPlacement="top"
        label={label}
        control={<Rating {...bindField} {...props} />}
      />
    </FormControl>
  )
}

export default FormikRating
