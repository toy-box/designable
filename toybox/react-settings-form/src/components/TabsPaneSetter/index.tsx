import React, { useCallback, useContext, useMemo } from 'react'
import { Button } from 'antd'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'

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
  }, [])

  return (
    <div
      className={cls(prefix, props.className)}
      style={{ width: '100%', ...props.style }}
    >
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tabPanes.map((tabPane) => (
          <li key={tabPane.id} style={{ border: '1px solid lightgray' }}>
            {tabPane.tab}
          </li>
        ))}
      </ul>
      <Button type="dashed" onClick={addTabPane} block>
        <TextWidget>Add Tab</TextWidget>
      </Button>
    </div>
  )
})
