import React, { useCallback, useContext, useMemo } from 'react'
import { Button } from 'antd'
import { toArr } from '@formily/shared'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'

export interface ICollapseAdder {
  className?: string
  style?: React.CSSProperties
  defaultExpand?: boolean
}

export const CollapseAdder: React.FC<ICollapseAdder> = observer((props) => {
  const prefix = usePrefix('collapse-adder')
  const { node } = useContext(SchemaExpressionScopeContext)
  const panels = useMemo(
    () =>
      node.children.map((panel) => ({
        id: panel.id,
        header: panel.props['x-component-props'].header,
      })),
    [node.children]
  )
  const addPanel = useCallback(() => {
    const tabPane = new TreeNode({
      componentName: 'CollapsePanel',
      props: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: `Unnamed Title`,
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
        {panels.map((panel) => (
          <li key={panel.id} style={{ border: '1px solid lightgray' }}>
            {panel.header}
          </li>
        ))}
      </ul>
      <Button type="dashed" onClick={addPanel} block>
        <TextWidget>Add Panel</TextWidget>
      </Button>
    </div>
  )
})
