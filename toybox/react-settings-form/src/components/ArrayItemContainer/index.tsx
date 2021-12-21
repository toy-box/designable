import React from 'react'
import { usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import './styles.less'

export interface IArrayItemContinerProps {
  className?: string
  style?: React.CSSProperties
}

export const ArrayItemContiner: React.FC<IArrayItemContinerProps> = (props) => {
  const prefix = usePrefix('array-item-continer')
  return (
    <div className={cls(prefix, props.className)} style={props.style}>
      <div className={prefix + '-top-border'}></div>
      {props.children}
      <div className={prefix + '-bottom-border'}></div>
    </div>
  )
}
