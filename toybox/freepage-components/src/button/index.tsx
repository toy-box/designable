import React from 'react'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { Action, ActionType, ParameterValue } from '../types'
import { useActions, useDataView } from '../hooks'

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
  const handleClick = () => {
    switch (action?.type) {
      case ActionType.Link:
        break
      case ActionType.Page:
        console.warn('params', getParams(action))
        break
      case ActionType.Autoflow:
        break
      default:
        break
    }
  }

  const getParams = (action: Action) => {
    const params = [] as ParameterValue[]
    ;(action.pageAction.params || []).forEach((param) => {
      params.push(dataView.dataValue[param.target])
    })
    return params
  }

  return (
    <OrgButton onClick={handleClick} {...otherProps}>
      {caption}
    </OrgButton>
  )
}
