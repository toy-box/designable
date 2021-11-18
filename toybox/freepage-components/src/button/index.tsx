import React from 'react'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { Action, ActionType, ParamBind } from '../types'
import { useActions, useDataView } from '../hooks'
import { useField } from '@formily/react'

export type ButtonType = Pick<IButtonProps, 'onClick'> & {
  caption: React.ReactNode
  action?: Action
}

export const Button: React.FC<ButtonType> = ({
  caption,
  action,
  ...otherProps
}) => {
  const dataView = useDataView()
  const actions = useActions()
  const buttonField = useField()
  const handleClick = () => {
    switch (action?.type) {
      case ActionType.Link:
        actions.handleLinkAction(action.linkAction)
        break
      case ActionType.Page:
        actions.handlePageAction(action.pageAction)
        break
      case ActionType.Autoflow:
        actions.handleAutoflowAction(action.autoflowAction)
        break
      default:
        break
    }
  }

  const getParams = (action: Action) => {
    const params = [] as ParamBind[]
    ;(action.pageAction.params || []).forEach((param) => {
      params.push(dataView.dataValue[param.path])
    })
    return params
  }

  return (
    <OrgButton onClick={handleClick} {...otherProps}>
      {caption}
    </OrgButton>
  )
}
