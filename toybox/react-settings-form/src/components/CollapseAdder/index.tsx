import React, { useCallback, useContext } from 'react'
import { Button } from 'antd'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix } from '@designable/react'
import cls from 'classnames'

export interface ICollapseAdder {
  className?: string
  style?: React.CSSProperties
  defaultExpand?: boolean
}

export const CollapseAdder: React.FC<ICollapseAdder> = observer((props) => {
  const prefix = usePrefix('collapse-adder')
  const { node } = useContext(SchemaExpressionScopeContext)
  const addPanel = useCallback(() => {
    const tabPane = new TreeNode({
      componentName: 'Field',
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
    <div className={cls(prefix, props.className)} style={props.style}>
      <Button onClick={addPanel}>+增加</Button>
    </div>
  )
})
