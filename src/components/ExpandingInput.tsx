import { InputBaseComponentProps, makeStyles } from '@material-ui/core'
import React, { useLayoutEffect, useRef, useState } from 'react'

import clsx from 'clsx'

interface Props {
  minWidth?: string | number
  maxWidth?: string | number
  name?: string
}

type StyleProps = {
  minWidth: string | number | undefined
  width: string | number
  maxWidth: string | number | undefined
}
const useStyles = makeStyles({
  expandingInput: {
    minWidth: ({ minWidth }: StyleProps) => minWidth,
    width: ({ width }) => width,
    maxWidth: ({ maxWidth }) => maxWidth,
  },
})

/**
 * An input that resizes to fit content.
 * Rather expensive as it creates a dummy field to measure on changes during layout
 *
 * __DOES NOT BEHAVE CORRECTLY IF UNCONTROLLED__
 *
 * The only alternative I found was contenteditable on a span, but does not play well with react
 *
 * I hate web
 */
const ExpandingInput: React.FC<InputBaseComponentProps & Props> = ({
  className: propClassName,
  minWidth = '3ex',
  maxWidth,
  padWidth = 10,
  ...props
}) => {
  const { value = '' } = props

  const ref = useRef<HTMLInputElement>(null)

  const [width, setWidth] = useState(minWidth)
  const classes = useStyles({ minWidth, width, maxWidth })
  const className = clsx(classes.expandingInput, propClassName)

  useLayoutEffect(() => {
    // Loosely based on https://stackoverflow.com/a/7168967/2384326
    if (ref.current != null) {
      const test = document.createElement('input')
      test.className = className
      test.style.position = 'absolute'
      test.style.padding = '0'
      test.style.width = '0'
      test.disabled = true
      test.value = value
      ref.current.insertAdjacentElement('afterend', test)
      setWidth(test.scrollWidth + padWidth)
      test.parentNode?.removeChild(test)
    }
  }, [ref, value, className, padWidth])

  return <input className={className} {...props} ref={ref} />
}

export default ExpandingInput
