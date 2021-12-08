import React from 'react'
import { parseResult } from '@toy-box/formula'
import { isNum, FormPath } from '@formily/shared'
import { LinkAction, PageAction, AutoflowAction } from '../types'
import { IActionFieldData } from '../context/actions/'
import { ActionContext } from '../context/actions'

const DATA_GRID = 'DataGrid'
const DATA_LIST = 'DataList'
const DATA_VIEW = 'DataView'

export const getFieldValue = (actionFieldData: IActionFieldData) => {
  const { field, index } = actionFieldData
  const { form } = field
  if ([DATA_GRID, DATA_LIST].includes(field.component[0]) && isNum(index)) {
    return {
      $Record: field.data.rows[index],
      $SelectedRows: field.data.selectedRows,
      $SelectedRowKeys: field.data.selectedRowKeys,
      $PageParams: field.form.getValuesIn('$PagePararms'),
    }
  } else if (field.component[0] === DATA_VIEW) {
    return {
      $PageParams: form.getValuesIn('$PagePararms'),
      ...form.getValuesIn(field.path),
    }
  } else {
    return {
      $PageParams: form.getValuesIn('$PagePararms'),
    }
  }
}

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
      const variableMap = getFieldValue(data)
      const parameters = pageAction.parameters.map((parameter) => ({
        key: parameter.key,
        value: parseResult(parameter.expression, (path: string) =>
          FormPath.getIn(variableMap, path)
        ),
      }))
      actions.handlePageAction({ pageId: pageAction.pageId, parameters })
    },
    handleAutoflowAction: (
      autoflowAction: AutoflowAction,
      data: IActionFieldData
    ) => {
      actions.handleAutoflowAction(autoflowAction)
    },
  }
}
