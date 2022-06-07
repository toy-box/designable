import React from 'react'

export const SlotContainer: React.FC<any> = (props) => {
  return <div {...props}>{props.children}</div>
}
