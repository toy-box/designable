import { Field } from '@formily/core'
import { useField } from '@formily/react'
import React from 'react'
import {
  ExpressionParse,
  LinkAction,
  PageAction,
  AutoflowAction,
} from '../types'
import { ActionContext } from '../context/actions'

export const useActions = () => {
  return React.useContext(ActionContext)
}

export const useFieldActions = (
  expParse: ExpressionParse = () => undefined
) => {
  const actions = useActions()
  const field = useField()
  return {
    handleLinkAction: (linkAction: LinkAction) => {
      actions.handleLinkAction(linkAction)
    },
    handlePageAction: (pageAction: PageAction) => {
      const expPageAction = {
        ...pageAction,
        params: pageAction.params.map((param) => ({
          key: param.key,
          value: expParse(param.expression),
        })),
      }
      actions.handlePageAction(pageAction)
    },
    handleAutoflowAction: (autoflowAction: AutoflowAction) => {
      actions.handleAutoflowAction(autoflowAction)
    },
  }
}
