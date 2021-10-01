import React from 'react'
import { Divider as OrgDivider } from '@toy-box/freepage-components'
import { DnFC, useTreeNode } from '@toy-box/designable-react'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Divider: DnFC<React.ComponentProps<typeof OrgDivider>> = (
  props
) => {
  const { content, ...otherProps } = props
  const node = useTreeNode()

  return (
    <OrgDivider
      content={
        content && (
          <span
            data-content-editable="x-component-props.caption"
            data-content-editable-node-id={node.id}
          >
            {content}
          </span>
        )
      }
      {...otherProps}
    />
  )
}

Divider.Behavior = createBehavior({
  name: 'Divider',
  selector: (node) => node.props['x-component'] === 'Divider',
  designerProps: {
    droppable: false,
    propsSchema: createVoidFieldSchema(AllSchemas.Divider),
  },
  designerLocales: AllLocales.Divider,
})

Divider.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Divider',
      },
    },
  ],
})
