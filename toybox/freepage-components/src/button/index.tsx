import React from 'react'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import {
  ActionType,
  AutoflowAction,
  IAction,
  LinkAction,
  PageAction,
} from '../context/actions/types'
import { useActions } from '../hooks'

export type ButtonType = Pick<IButtonProps, 'onClick'> & {
  caption: React.ReactNode
  action: IAction
}

export const Button: React.FC<ButtonType> = ({
  caption,
  action,
  ...otherProps
}) => {
  const actions = useActions()
  const handleClick = () => {
    switch (action.type) {
      case ActionType.Link:
        actions?.linkHandle(action as LinkAction)
        break
      case ActionType.Page:
        actions?.pageHandle(action as PageAction)
        break
      case ActionType.Autoflow:
        actions?.autoflowHandle(action as AutoflowAction)
      case ActionType.Save:
        actions?.saveHandle('refObjectKey', {})
      default:
        break
    }
  }

  return (
    <OrgButton onClick={handleClick} {...otherProps}>
      {caption}
    </OrgButton>
  )
}
