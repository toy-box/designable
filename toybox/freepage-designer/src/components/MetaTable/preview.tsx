import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { ButtonSize, ButtonType } from 'antd/es/button'
import { useTreeNode, useNodeIdProps, DnFC } from '@toy-box/designable-react'
import { observer } from '@formily/reactive-react'
import {
  OperateColumn,
  OperateColumnProps,
} from '@toy-box/meta-components/es/components/meta-table/components'
import { IButtonItem } from '@toy-box/toybox-ui'
import { createInnerSchema, createMetaTableSchema } from '../Field'
import { queryNodesByComponentPath } from '../../shared'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import './styles.less'

declare type ActionItem = {
  action: unknown
  caption: string
  size: ButtonSize
  type: ButtonType
}

declare type ActionOperateType = {
  items: ActionItem[]
  max: number
  group?: boolean
}

function operateFactory(
  operate: ActionOperateType,
  render: React.FC<OperateColumnProps>
) {
  return (text: any, record: any, index: number) => {
    return render({
      text,
      record,
      index,
      operate: {
        items: (operate?.items || []).map((item) => makeOperateItem(item)),
        max: operate?.max,
        group: operate?.group,
      },
    })
  }
}

function makeOperateItem(item: ActionItem): IButtonItem {
  return {
    text: item.caption,
    size: item.size,
    type: item.type,
  }
}

export const MetaTable: DnFC = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const { isOperation, operate } = node.props['x-component-props'] || {}
  const columnNodes = queryNodesByComponentPath(node, [
    'MetaTable',
    'MetaTable.Column',
  ])

  const tableColumns = React.useMemo(() => {
    const cols: ColumnsType = columnNodes.map((node, idx) => ({
      key: node.id,
      title: node.props['x-component-props']?.title,
      dataIndex: node.id,
      className: `data-id:${node.id}`,
      width: node.props['x-component-props']?.width,
    }))
    if (isOperation && operate) {
      cols.push({
        key: 'meta-table-operate',
        title: node.props['x-component-props'].operateHeader,
        dataIndex: 'meta-table-operate',
        align: 'right',
        render: operateFactory(operate, OperateColumn),
        width: 100,
      })
    }
    return cols
  }, [columnNodes, isOperation, operate])

  const dataSource = React.useMemo(() => {
    const data = {}
    columnNodes.forEach((node) => {
      data[node.id] = `{${node.props['x-component-props']?.title}}`
    })
    return [data, data, data]
  }, [tableColumns])

  return (
    <Table
      {...nodeId}
      bordered
      scroll={{ x: '100%' }}
      style={{ marginBottom: 16 }}
      rowKey={'id'}
      pagination={false}
      columns={tableColumns}
      dataSource={dataSource}
      components={{
        header: {
          cell: (props: any) => {
            return (
              <th
                {...props}
                data-designer-node-id={
                  props.className.match(/data-id\:([^\s]+)/)?.[1]
                }
              >
                {props.children}
              </th>
            )
          },
        },
        body: {
          cell: (props: any) => {
            return (
              <td
                {...props}
                data-designer-node-id={
                  props.className.match(/data-id\:([^\s]+)/)?.[1]
                }
              >
                {props.children}
              </td>
            )
          },
        },
      }}
    />
  )
})

MetaTable.Behavior = createBehavior(
  {
    name: 'MetaTable',
    selector: (node) => node.props['x-component'] === 'MetaTable',
    designerProps(node) {
      return {
        draggable: false,
        cloneable: false,
        deletable: false,
        propsSchema: createMetaTableSchema(AllSchemas.MetaTable),
      }
    },
    designerLocales: AllLocales.MetaTable,
  },
  {
    name: 'MetaTable.Column',
    selector: (node) => node.props['x-component'] === 'MetaTable.Column',
    designerProps(node) {
      return {
        draggable: false,
        propsSchema: createInnerSchema(AllSchemas.MetaTable.Column),
      }
    },
    designerLocales: AllLocales.MetaTableColumn,
  }
)

MetaTable.Resource = createResource({
  title: { 'zh-CN': '表格', 'en-US': '表格' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'MetaTable',
      },
    },
  ],
})
