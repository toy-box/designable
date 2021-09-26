import React from 'react'
import { Text as OrgText, ITextProps } from '@toy-box/toybox-ui'

export type TextProps = ITextProps & {
  content: string
}

export const Text: React.FC<TextProps> = ({ content, ...otherProps }) => {
  return <OrgText {...otherProps}>{content}</OrgText>
}
