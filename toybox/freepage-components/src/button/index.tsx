import React, { useCallback } from 'react'
import { useField } from '@formily/react'
import { Modal } from 'antd'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { Action, ActionType } from '../types'
import { useFieldActions, useDataView } from '../hooks'

const { confirm } = Modal

export type ButtonProps = Pick<IButtonProps, 'onClick'> & {
  caption: React.ReactNode
  enableConfirm?: boolean
  confirmMessage?: string
  action?: Action
}

export const Button: React.FC<ButtonProps> = ({
  caption,
  action,
  enableConfirm,
  confirmMessage,
  ...otherProps
}) => {
  const field = useField()
  const dataView = useDataView()
  const actions = useFieldActions()

  const handleAction = () => {
    switch (action?.type) {
      case ActionType.Link:
        return actions.handleLinkAction(action.linkAction, { field })
      case ActionType.Page:
        return actions.handlePageAction(action.pageAction, { field })
      case ActionType.Autoflow:
        return actions.handleAutoflowAction(action.autoflowAction, { field })
      default:
        break
    }
  }

  const handleClick = useCallback(() => {
    if (enableConfirm) {
      confirm({
        title: confirmMessage,
        onOk: handleAction,
      })
    } else {
      handleAction()
    }
  }, [handleAction])

  return (
    <OrgButton onClick={handleClick} {...otherProps}>
      {caption}
    </OrgButton>
  )
}
