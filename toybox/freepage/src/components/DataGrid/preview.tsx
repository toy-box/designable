import React from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  useNodeIdProps,
  DropWidget,
  DnFC,
} from '@toy-box/designable-react'
import { observer } from '@formily/react'
import {
  FilterDisplay,
  FilterPanel,
  TableStatusBar,
} from '@toy-box/meta-components'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const DataGrid: DnFC<TableProps<Record<string, any>>> = observer(
  (props) => {
    const node: TreeNode = useTreeNode()
    const nodeId = useNodeIdProps()

    React.useEffect(() => {
      if (node.props['x-component-props']?.repository != null) {
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
    }, [node.props['x-component-props']?.repository])

    return <div {...nodeId}>{props.children || <Table />}</div>
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
        type: 'void',
        'x-component': 'DataGrid',
      },
    },
  ],
})
