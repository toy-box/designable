import React from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@toy-box/designable-react'
import { observer } from '@formily/react'
import {
  FilterDisplay,
  FilterPanel,
  TableStatusBar,
} from '@toy-box/meta-components'
import { createVoidFieldSchema } from '../Field'
import { useDropTemplate } from '../../hooks'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import {
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  createNodeId,
} from '../../shared'

// const ensureVoidItemsNode = createEnsureTypeItemsNode('void')

export const DataGrid: DnFC<TableProps<Record<string, any>>> = observer(
  (props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    const designer = useDropTemplate('DataGrid', (source) => {
      const voidNode = new TreeNode({
        componentName: 'DesignableField',
        props: {
          type: 'void',
          'x-component': 'ArrayTable.Column',
        },
        children: [...source],
      })
      return [voidNode]
    })
    const defaultRowKey = () => {
      return node.id
    }
    const createColumnId = (props: any) => {
      return createNodeId(
        designer,
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    }
    const renderColumn = () => {
      if (node.children.length === 0) return <DroppableWidget />
      const children = queryNodesByComponentPath(node, [
        'DataGrid',
        '*',
        (name) => name.indexOf('DataGrid.') === -1,
      ])
      return (
        <Table
          // {...createNodeId(designer, ensureVoidItemsNode(node).id)}
          size="small"
          bordered
          scroll={{ x: '100%' }}
          style={{ marginBottom: 16 }}
          rowKey={defaultRowKey}
          dataSource={[{ id: '1' }]}
          pagination={false}
          components={{
            header: {
              cell: (props: any) => {
                return (
                  <th {...props} {...createColumnId(props)}>
                    {props.children}
                  </th>
                )
              },
            },
            body: {
              cell: (props: any) => {
                return (
                  <td {...props} {...createColumnId(props)}>
                    {props.children}
                  </td>
                )
              },
            },
          }}
        >
          {children.length ? (
            children.map((node, key) => {
              return (
                <Table.Column
                  key={key}
                  dataIndex={node.id}
                  title={node.props.name}
                  className={`data-id:${node.id}`}
                  render={() => {
                    return <div style={{ height: '80px' }}></div>
                  }}
                />
              )
            })
          ) : (
            <DroppableWidget />
          )}
        </Table>
      )
    }

    return (
      <div {...nodeId}>
        <FilterPanel />
        <TableStatusBar />
        {renderColumn()}
      </div>
    )
  }
)

DataGrid.Behavior = createBehavior({
  name: 'DataGrid',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'DataGrid',
  designerProps: {
    droppable: true,
    inlineChildrenLayout: true,
    propsSchema: createVoidFieldSchema(AllSchemas.DataGrid),
  },
  designerLocales: AllLocales.DataGrid,
})

DataGrid.Resource = createResource({
  icon: 'ArrayTableSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-component': 'DataGrid',
      },
    },
  ],
})
