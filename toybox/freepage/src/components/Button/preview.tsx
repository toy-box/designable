import React from 'react'
import { Button as OrgButton } from '@toy-box/freepage-components'
import { DnFC } from '@toy-box/designable-react'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Button: DnFC<React.ComponentProps<typeof OrgButton>> = (props) => {
  return <OrgButton {...props} />
}

Button.Behavior = createBehavior({
  name: 'Button',
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    droppable: false,
    propsSchema: createVoidFieldSchema(AllSchemas.Button),
  },
  designerLocales: AllLocales.Button,
})

Button.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Button',
        'x-component-props': {
          content: 'Button',
          type: 'default',
        },
      },
    },
  ],
})
