import React, { useCallback } from 'react'
import { useField } from '@formily/react'
import { Modal } from 'antd'
import { Button as OrgButton, IButtonProps } from '@toy-box/toybox-ui'
import { Action, ActionType } from '../types'
import { useFieldActions, useDataView } from '../hooks'

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
  const [modal, contextHolder] = Modal.useModal()

  const handleAction = () => {
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

  const handleClick = useCallback(() => {
    if (enableConfirm) {
      modal.confirm({
        title: confirmMessage,
        onOk: handleAction,
      })
    } else {
      handleAction()
    }
  }, [modal, handleAction])

  return (
    <React.Fragment>
      <OrgButton onClick={handleClick} {...otherProps}>
        {caption}
      </OrgButton>
      {contextHolder}
    </React.Fragment>
  )
}
