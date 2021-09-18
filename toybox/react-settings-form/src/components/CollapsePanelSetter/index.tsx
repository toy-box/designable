import React, { useCallback, useContext, useMemo } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'
import { HandleIcon } from '../HandleIcon'
import './styles.less'

export interface ICollapsePanelSetter {
  className?: string
  style?: React.CSSProperties
  defaultExpand?: boolean
}

const panelItem = observer((props: any) => {
  const prefix = usePrefix('collapse-panel-setter')
  return (
    <div className={`${prefix}__item`}>
      <span {...props.dragHandleProps} className={`${prefix}__item--handle`}>
        <HandleIcon />
      </span>
      <span>{props.item.props['x-component-props'].header}</span>
    </div>
  )
})

export const CollapsePanelSetter: React.FC<ICollapsePanelSetter> = observer(
  (props) => {
    const prefix = usePrefix('collapse-panel-setter')
    const { node } = useContext(SchemaExpressionScopeContext)

    const sortPanels = useCallback(
      (panels) => {
        node.children = panels.map((panel) =>
          node.children.find((child) => child.id === panel.id)
        )
      },
      [node]
    )

    const addPanel = useCallback(() => {
      const panel = new TreeNode({
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: `Panel ${node.children.length + 1}`,
          },
        },
      })
      node.append(panel)
    }, [node])

    return (
      <div className={cls(prefix, props.className)} style={props.style}>
        <SortableList
          onChange={sortPanels}
          dataSource={node.children}
          itemRender={panelItem}
          idKey="id"
        />
        <Button type="dashed" onClick={addPanel} block>
          <TextWidget>Add Panel</TextWidget>
        </Button>
      </div>
    )
  }
)
