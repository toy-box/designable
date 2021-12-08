import React from 'react'
import { useField } from '@formily/react'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { Action, ActionType } from '../types'
import { useFieldActions, useDataView } from '../hooks'

export type ButtonProps = Pick<IButtonProps, 'onClick'> & {
  caption: React.ReactNode
  action?: Action
}

export const Button: React.FC<ButtonProps> = ({
  caption,
  action,
  ...otherProps
}) => {
  const field = useField()
  const dataView = useDataView()
  const actions = useFieldActions()

  const handleClick = () => {
    switch (action?.type) {
      case ActionType.Link:
        actions.handleLinkAction(action.linkAction, { field })
        break
      case ActionType.Page:
        actions.handlePageAction(action.pageAction, { field })
        break
      case ActionType.Autoflow:
        actions.handleAutoflowAction(action.autoflowAction, { field })
        break
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
