import React from 'react'
import { parseResult } from '@toy-box/formula'
import { LinkAction, PageAction, AutoflowAction } from '../types'
import { IActionFieldData } from '../context/actions/'
import { ActionContext } from '../context/actions'
import { useGetFieldValue } from './useGetFieldValue'
import { useField } from '@formily/react'

export const useActions = () => {
  return React.useContext(ActionContext)
}

export const useFieldActions = () => {
  const actions = useActions()
  return {
    handleLinkAction: (linkAction: LinkAction, data: IActionFieldData) => {
      actions.handleLinkAction(linkAction)
    },
    handlePageAction: (pageAction: PageAction, data: IActionFieldData) => {
      const expPageAction = {
        ...pageAction,
        params: pageAction.params.map((param) => ({
          key: param.key,
          value: parseResult(param.expression, () => 0),
        })),
      }
      actions.handlePageAction(pageAction)
    },
    handleAutoflowAction: (
      autoflowAction: AutoflowAction,
      data: IActionFieldData
    ) => {
      actions.handleAutoflowAction(autoflowAction)
    },
  }
}
