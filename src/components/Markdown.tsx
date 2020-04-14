import { Link, Typography } from '@material-ui/core'
import { ReactMarkdownProps } from 'react-markdown'

const markdownConfig: Partial<ReactMarkdownProps> = {
  renderers: { text: Typography, link: Link },
  linkTarget: '_blank',
}
export default markdownConfig
