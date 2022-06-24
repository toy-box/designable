import React from 'react'
import cls from 'classnames'
import { usePrefix } from '../../hooks'
import './styles.less'

export type TopbarPanelProps = {
  style?: React.CSSProperties
  className?: string
}

export type TopbarPanelRegionProps = {
  style?: React.CSSProperties
  className?: string
  position: 'left' | 'center' | 'right'
}

export const TopbarPanel = ({ style, className, children }) => {
  const prefix = usePrefix('topbar-panel')
  return (
    <div style={style} className={cls(prefix, className)}>
      {children}
    </div>
  )
}

const Region: React.FC<React.PropsWithChildren<TopbarPanelRegionProps>> = ({
  style,
  position,
  className,
  children,
}) => {
  const prefix = `${usePrefix('topbar-panel')}-${position}`
  return (
    <div style={style} className={cls(prefix, className)}>
      {children}
    </div>
  )
}

TopbarPanel.Region = Region
