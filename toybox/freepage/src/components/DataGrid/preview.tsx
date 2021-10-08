import React from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import { useTreeNode, useNodeIdProps, DnFC } from '@toy-box/designable-react'
import { observer } from '@formily/react'
import { ToolBar } from '@toy-box/toybox-ui'
import {
  FilterDisplay,
  FilterPanel,
  TableStatusBar,
} from '@toy-box/meta-components'
import { createDataShourceSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const DataGrid: DnFC<TableProps<Record<string, any>>> = observer(
  (props) => {
    const node: TreeNode = useTreeNode()
    const nodeId = useNodeIdProps()

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
      <div {...nodeId}>
        <ToolBar>
          <FilterPanel />
        </ToolBar>
        <FilterDisplay />
        <TableStatusBar />
        {props.children || <Table />}
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
    propsSchema: createDataShourceSchema(AllSchemas.DataGrid),
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
