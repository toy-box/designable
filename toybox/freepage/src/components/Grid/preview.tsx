import React from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import { DnFC, useTreeNode, useNodeIdProps } from '@toy-box/designable-react'
import { observer } from '@formily/reactive-react'
import { Droppable } from '../../common/Droppable'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import cls from 'classnames'
import './styles.less'

type formilyGrid = typeof FormilyGird

export const Grid: DnFC<React.ComponentProps<formilyGrid>> & {
  GridColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>
} = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.children.length === 0) return <Droppable {...props} />
  const totalColumns = node.children.reduce(
    (buf, child) => buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
    0
  )
  return (
    <div {...nodeId} className="dn-grid">
      <FormilyGird {...props} key={totalColumns}>
        {props.children}
      </FormilyGird>
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addGridColumn'),
            onClick: () => {
              const column = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Grid.GridColumn',
                },
              })
              node.append(column)
            },
          },
        ]}
      />
    </div>
  )
})

Grid.GridColumn = observer((props) => {
  return (
    <div
      {...props}
      className={cls(props['className'], {
        'dn-grid-column': !props.children,
      })}
      data-span={props.gridSpan}
      style={{
        ...props['style'],
        gridColumnStart: `span ${props.gridSpan || 1}`,
      }}
    >
      {props.children}
    </div>
  )
})

Grid.Behavior = createBehavior(
  {
    name: 'Grid',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Grid',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] !== 'Grid',
      propsSchema: createFieldSchema(AllSchemas.Grid),
    },
    designerLocales: AllLocales.Grid,
  },
  {
    name: 'Grid.GridColumn',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Grid.GridColumn',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'Grid',
      propsSchema: createFieldSchema(AllSchemas.Grid.GridColumn),
    },
    designerLocales: AllLocales.GridColumn,
  }
)

Grid.Resource = createResource({
  icon: 'GridSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Grid',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Grid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Grid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Grid.GridColumn',
          },
        },
      ],
    },
  ],
})
