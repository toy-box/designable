import React from 'react'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { IAction } from '../actions/types'

export type ButtonType = Pick<IButtonProps, 'onClick'> & { action: IAction }

export const Button: React.FC<IButtonProps> = ({ children, ...otherProps }) => {
  const handleClick = () => {
    // console.log('handleClick')
  }
  return (
    <OrgButton onClick={handleClick} {...otherProps}>
      {children}
    </OrgButton>
  )
}
