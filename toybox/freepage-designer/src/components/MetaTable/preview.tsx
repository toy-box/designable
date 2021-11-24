import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { Table } from 'antd'
import { useTreeNode, useNodeIdProps, DnFC } from '@toy-box/designable-react'
import { observer } from '@formily/reactive-react'
import { createVoidFieldSchema } from '../Field'
import { queryNodesByComponentPath } from '../../shared'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import './styles.less'

export const MetaTable: DnFC = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const { isOperate, operate } = node.props['x-component-props']
  const columns = queryNodesByComponentPath(node, [
    'MetaTable',
    'MetaTable.Column',
  ])

  return (
    <Table
      {...nodeId}
      bordered
      scroll={{ x: '100%' }}
      style={{ marginBottom: 16 }}
      rowKey={'id'}
      pagination={false}
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
    >
      {(columns || []).map((node, key) => {
        return (
          <Table.Column
            key={key}
            dataIndex={node.id}
            title={
              <span
                data-content-editable="x-component-props.title"
                data-content-editable-node-id={node.id}
              >
                {node.props['x-component-props']?.title}
              </span>
            }
            className={`data-id:${node.id}`}
            width={node.props['x-component-props']?.width}
          />
        )
      })}
    </Table>
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
        propsSchema: createVoidFieldSchema(AllSchemas.MetaTable),
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
        propsSchema: createVoidFieldSchema(AllSchemas.MetaTable.Column),
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
