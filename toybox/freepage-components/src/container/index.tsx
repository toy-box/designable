import React from 'react'
import { observer } from '@formily/react'

export type ContainerProps = {
  className?: string
  style?: React.CSSProperties
}

export const Container: React.FC<ContainerProps> = observer(
  ({ className, style, children }) => {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
)
