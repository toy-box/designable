import React, { useCallback, useContext } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'
import { HandleIcon } from '../HandleIcon'

import './styles.less'
import { useScope } from '../../hooks'

export interface ITabsPaneSetter {
  className?: string
  style?: React.CSSProperties
}

const tabPaneItem = observer((props: any) => {
  const prefix = usePrefix('tabs-pane-setter')
  return (
    <div className={`${prefix}__item`}>
      <span {...props.dragHandleProps} className={`${prefix}__item--handle`}>
        <HandleIcon />
      </span>
      <span>{props.item.props['x-component-props'].tab}</span>
    </div>
  )
})

export const TabsPaneSetter: React.FC<ITabsPaneSetter> = observer((props) => {
  const prefix = usePrefix('tabs-pane-setter')
  const { node } = useScope()

  const sortPanes = useCallback(
    (tabPanes) => {
      node.children = tabPanes.map((pane) =>
        node.children.find((child) => child.id === pane.id)
      )
    },
    [node]
  )

  const addTabPane = useCallback(() => {
    const tabPane = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Tabs.TabPane',
        'x-component-props': {
          tab: `Tab ${node.children.length + 1}`,
        },
      },
    })
    node.append(tabPane)
  }, [node])

  return (
    <div className={cls(prefix, props.className)} style={props.style}>
      <SortableList
        onChange={sortPanes}
        dataSource={node.children}
        itemRender={tabPaneItem}
        idKey="id"
      />
      <Button type="dashed" onClick={addTabPane} block>
        <TextWidget>Add Tab</TextWidget>
      </Button>
    </div>
  )
})
