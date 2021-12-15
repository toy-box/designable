import React from 'react'
import { TableProps } from 'antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  useNodeIdProps,
  useDesigner,
  DnFC,
  TreeNodeWidget,
} from '@toy-box/designable-react'
import { observer } from '@formily/react'
import { ToolBar } from '@toy-box/toybox-ui'
import { DataGrid as ToyboxDataGrid } from '@toy-box/meta-components'
import { createDataSourceSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import { matchComponent } from '../../shared'

export const DataGrid: DnFC<TableProps<Record<string, any>>> = observer(
  (props) => {
    const designer = useDesigner()
    const node: TreeNode = useTreeNode()
    const nodeId = useNodeIdProps()
    React.useEffect(() => {
      const tableNode = node.children.find((child) =>
        matchComponent(child, 'MetaTable')
      )
      const spaceNode = node.children.find((child) =>
        matchComponent(child, 'Space')
      )
      if (tableNode == null) {
        node.append(
          new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'MetaTable',
            },
          })
        )
      }
      if (spaceNode == null) {
        node.append(
          new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'Space',
            },
          })
        )
      }
    }, [])
    const tableNode = node.children.find((child) =>
      matchComponent(child, 'MetaTable')
    )
    const spaceNode = node.children.find((child) =>
      matchComponent(child, 'Space')
    )
    React.useEffect(() => {
      if (
        node.props?.dataSource?.repository != null &&
        !node.children.some(
          (child) => child.props['x-component'] === 'MetaTable'
        )
      ) {
        node.append(
          new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'MetaTable',
            },
          })
        )
      }
    }, [node.props?.dataSource?.repository])

    return (
      <div
        {...nodeId}
        {...node.props['x-component-props']}
        style={{ ...node.props['x-component-props'].style }}
      >
        <ToolBar>
          <ToyboxDataGrid.FilterPanel />
          {spaceNode &&
            React.createElement(
              'div',
              {
                [designer.props.nodeIdAttrName]: spaceNode.id,
              },
              <TreeNodeWidget node={spaceNode} />
            )}
        </ToolBar>
        <ToyboxDataGrid.FilterDisplay />
        <ToyboxDataGrid.TableStatusBar />
        {tableNode &&
          React.createElement(
            'div',
            {
              [designer.props.nodeIdAttrName]: tableNode.id,
            },
            <TreeNodeWidget node={tableNode} />
          )}
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
    propsSchema: createDataSourceSchema(AllSchemas.DataGrid),
  },
  designerLocales: AllLocales.DataGrid,
})

DataGrid.Resource = createResource({
  icon: 'ArrayTableSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DataGrid',
      },
    },
  ],
})
