import React, { FC } from 'react'
import { ButtonCluster as OrgButtonCluster, IButtonClusterProps, IButtonItem } from '@toy-box/toybox-ui'
import { useField } from '@formily/react'
import { Action, ActionType, ParamBind } from '../types'
import { useMetaColumn, useFieldActions, useDataView } from '../hooks'


export type ButtonItemType = Omit<IButtonItem, 'callback'> & {
  action?: Action
}

export type ButtonClusterProps = Omit<IButtonClusterProps, 'items'> & {
  items: ButtonItemType[]
}

export const ButtonCluster: FC<ButtonClusterProps> = ({
  items,
  max = 3,
  group,
}) => {
  const field = useField()
  const actions = useFieldActions()
  const metaColumn = useMetaColumn()

  const generateCallback = (action: Action) => {
    return () => {
      switch (action?.type) {
        case ActionType.Link:
          actions.handleLinkAction(action.linkAction, { field, index: metaColumn?.index })
          break
        case ActionType.Page:
          actions.handlePageAction(action.pageAction, { field, index: metaColumn?.index })
          break
        case ActionType.Autoflow:
          actions.handleAutoflowAction(action.autoflowAction, { field, index: metaColumn?.index })
          break
        default:
          break
      }
    }
  }

  const buttonItems = React.useMemo(() => {
    return items.map(item => ({
      ...item,
      callback: generateCallback(item.action),
    }))
  }, [items])

  return (
    <OrgButtonCluster
      items={buttonItems}
      max={max}
      group={group}
    />
  )
}