import React from 'react'
import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd'

export type DividerProps = AntDividerProps & {
  caption?: React.ReactNode
}

export const Divider: React.FC<DividerProps> = ({ caption, ...otherProps }) => {
  return <AntDivider {...otherProps}>{caption}</AntDivider>
}
