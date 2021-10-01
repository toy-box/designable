import React from 'react'
import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd'

export type DividerProps = AntDividerProps & {
  content?: React.ReactNode
}

export const Divider: React.FC<DividerProps> = ({ content, ...otherProps }) => {
  return <AntDivider {...otherProps}>{content}</AntDivider>
}
