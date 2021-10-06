import React, { useCallback, useMemo } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget, IconWidget } from '@toy-box/designable-react'
import cls from 'classnames'
import { HandleIcon } from '../HandleIcon'
import { useScope } from '../../hooks'

import './styles.less'

const columnItem = observer((props: any) => {
  const prefix = usePrefix('table-column-setter')
  return (
    <div className={`${prefix}__item`}>
      <span {...props.dragHandleProps} className={`${prefix}__item--handle`}>
        <HandleIcon />
      </span>
      <span>{props.item.props['x-component-props']?.title}</span>
      <span>
        <IconWidget infer="setting" />
      </span>
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
