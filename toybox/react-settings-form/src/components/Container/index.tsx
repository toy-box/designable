import React from 'react'

export type ContainerProps = {
  className?: string
  style?: React.CSSProperties
}

export const Container: React.FC<ContainerProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
