import React from 'react'
import cls from 'classnames'
import { usePrefix } from '../../hooks'
import './styles.less'

export type TopbarPanelProps = {
  style?: React.CSSProperties
  className?: string
}

export const TopbarPanel: React.FC<TopbarPanelProps> = ({
  style,
  className,
  children,
}) => {
  const prefix = usePrefix('topbar-panel')
  return (
    <div style={style} className={cls(prefix, className)}>
      {children}
    </div>
  )
}
