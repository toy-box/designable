import React, { useCallback } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer } from '@formily/react'
import { TreeNode } from '@designable/core'
import {
  usePrefix,
  useSelection,
  useCurrentNode,
  useWorkbench,
  TextWidget,
  IconWidget,
} from '@toy-box/designable-react'
import cls from 'classnames'
import { HandleIcon } from '../HandleIcon'
import { useScope } from '../../hooks'

import './styles.less'

const columnItem = observer((props: any) => {
  const workbench = useWorkbench()
  const currentWorkspace =
    workbench?.activeWorkspace || workbench?.currentWorkspace
  const currentWorkspaceId = currentWorkspace?.id
  const selection = useSelection(props.workspaceId)
  const node: TreeNode = useCurrentNode(currentWorkspaceId)
  const itemNode = node.children.find((child) => child.id === props.item.id)
  const prefix = usePrefix('table-column-setter')

  return (
    <div className={`${prefix}__item`}>
      <div className={`${prefix}__item--left`}>
        <span {...props.dragHandleProps} className={`${prefix}__item--handle`}>
          <HandleIcon />
        </span>
        <span>{props.item.props['x-component-props']?.title}</span>
      </div>
      <div
        className={`${prefix}__item--right`}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          selection.select(itemNode)
        }}
      >
        <IconWidget infer="Setting" />
      </div>
    </div>
  )
})

export type TableColumnSetterProps = {
  className?: string
  style?: React.CSSProperties
}

export const TableColumnSetter: React.FC<TableColumnSetterProps> = observer(
  (props) => {
    const prefix = usePrefix('tabs-pane-setter')
    const node: TreeNode = useScope().node

    const sortPanes = useCallback(
      (columns) => {
        node.children = columns.map((column) =>
          node.children.find((child) => child.id === column.id)
        )
      },
      [node]
    )

    const addColumn = useCallback(() => {
      node.append(
        new TreeNode({
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'MetaTable.Column',
            'x-component-props': {
              title: 'Column',
            },
          },
        })
      )
    }, [node])

    return (
      <div className={cls(prefix, props.className)} style={props.style}>
        <SortableList
          onChange={sortPanes}
          dataSource={node.children || []}
          itemRender={columnItem}
          idKey="id"
        />
        <Button type="dashed" onClick={addColumn} block>
          <TextWidget>Add Column</TextWidget>
        </Button>
      </div>
    )
  }
)
