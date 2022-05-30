import React from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import { DnFC, useTreeNode, useNodeIdProps } from '@toy-box/designable-react'
import { observer } from '@formily/reactive-react'
import { Droppable } from '../../common/Droppable'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import cls from 'classnames'
import './styles.less'

type formilyGrid = typeof FormilyGird

export const Container: DnFC<React.ComponentProps<formilyGrid>> & {
  ContainerColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>
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
    </div>
  )
})

Container.ContainerColumn = observer((props) => {
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
        'grid-column': `span ${props.gridSpan || 1}`,
      }}
    >
      {props.children}
    </div>
  )
})

Container.Behavior = createBehavior(
  {
    name: 'Container',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Container',
    designerProps: {
      // droppable: true,
      allowDrop: (node) => node.props['x-component'] !== 'Container',
      propsSchema: createFieldSchema(AllSchemas.Container),
    },
    designerLocales: AllLocales.Container,
  },
  {
    name: 'Container.ContainerColumn',
    extends: ['Field'],
    selector: (node) =>
      node.props['x-component'] === 'Container.ContainerColumn',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'Container',
      propsSchema: createFieldSchema(AllSchemas.Container.ContainerColumn),
    },
    // designerLocales: AllLocales.Container.ContainerColumn,
  }
)

Container.Resource = createResource({
  icon: 'GridSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Container',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Container.ContainerColumn',
            'x-component-props': {
              gridSpan: 3,
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Container.ContainerColumn',
          },
        },
      ],
    },
  ],
})
