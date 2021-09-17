import React, { useCallback, useContext, useMemo } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'
import { HandleIcon } from './HandleIcon'

import './styles.less'

export interface ITabsPaneSetter {
  className?: string
  style?: React.CSSProperties
}

export const TabsPaneSetter: React.FC<ITabsPaneSetter> = observer((props) => {
  const prefix = usePrefix('tabs-pane-setter')
  const { node } = useContext(SchemaExpressionScopeContext)
  const tabPanes = useMemo(
    () =>
      node.children.map((tabPane) => ({
        id: tabPane.id,
        tab: tabPane.props['x-component-props'].tab,
      })),
    [node.children]
  )
  const paneItem = ({ item, dragHandleProps }) => {
    return (
      <div className={`${prefix}__item`}>
        <span {...dragHandleProps} className={`${prefix}__item--handle`}>
          <HandleIcon />
        </span>
        <span>{item.tab}</span>
      </div>
    )
  }

  const addTabPane = useCallback(() => {
    const tabPane = new TreeNode({
      componentName: 'TabPane',
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
    <div
      className={cls(prefix, props.className)}
      style={{ width: '100%', ...props.style }}
    >
      {JSON.stringify(tabPanes)}
      <SortableList dataSource={tabPanes} itemRender={paneItem} idKey="id" />
      <Button type="dashed" onClick={addTabPane} block>
        <TextWidget>Add Tab</TextWidget>
      </Button>
    </div>
  )
})
