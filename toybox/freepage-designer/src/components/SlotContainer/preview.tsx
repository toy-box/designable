import React, { useEffect } from 'react'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, useTreeNode, useNodeIdProps } from '@toy-box/designable-react'
import { observer } from '@formily/reactive-react'
import { SlotContainer as OrgSlotContainer } from '@toy-box/freepage-components'
import { IFieldMeta } from '@toy-box/meta-schema'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export interface SlotContainerProps {
  metaSchema: IFieldMeta
  style?: React.CSSProperties
}

export const SlotContainer: DnFC<SlotContainerProps> = (props) => {
  const node: TreeNode = useTreeNode()
  const nodeId = useNodeIdProps()
  useEffect(() => {
    if (props?.metaSchema && node?.children?.length === 0) {
      const keys = Object.keys(props?.metaSchema?.properties)
      keys.forEach((key) => {
        node.append(
          new TreeNode({
            componentName: 'Field',
            props: props?.metaSchema?.properties[key],
          })
        )
      })
    }
  }, [])
  return (
    <OrgSlotContainer
      {...nodeId}
      {...node.props['x-component-props']}
      style={{ ...node.props['x-component-props']?.style }}
    >
      {props.children}
    </OrgSlotContainer>
  )
}

SlotContainer.Behavior = createBehavior({
  name: 'SlotContainer',
  // extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'SlotContainer',
  designerProps: {
    droppable: true,
    // allowDrop: (node) => node.props['x-component'] !== 'SlotContainer',
    propsSchema: createFieldSchema(AllSchemas.SlotContainer),
  },
  designerLocales: AllLocales.SlotContainer,
})

SlotContainer.Resource = createResource({
  icon: 'ArrayTableSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'SlotContainer',
        'x-component-props': {
          style: {
            height: '200px',
          },
          metaSchema: {
            type: 'object',
            properties: {
              btn: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  caption: 'Button',
                  type: 'default',
                },
              },
              btn1: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  caption: 'Button1',
                  type: 'default',
                },
              },
            },
          },
        },
      },
    },
  ],
})
