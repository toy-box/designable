import React from 'react'
import {
  ExpressionParse,
  LinkAction,
  PageAction,
  AutoflowAction,
} from '../types'
import { IActionFieldData } from '../context/actions/'
import { ActionContext } from '../context/actions'

export const useActions = () => {
  return React.useContext(ActionContext)
}

export const useFieldActions = (
  expParse: ExpressionParse = () => undefined
) => {
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
          value: expParse(param.expression),
        })),
      }
      actions.handlePageAction(pageAction)
    },
    handleAutoflowAction: (autoflowAction: AutoflowAction, data: IActionFieldData) => {
      actions.handleAutoflowAction(autoflowAction)
    },
  }
}
