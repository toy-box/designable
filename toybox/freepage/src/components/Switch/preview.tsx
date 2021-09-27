import React from 'react'
import { FieldBoolean } from '@toy-box/freepage-components'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@toy-box/designable-react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Switch: DnFC<React.ComponentProps<typeof FieldBoolean>> =
  FieldBoolean

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Switch',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Switch),
  },
  designerLocales: AllLocales.Switch,
})

Switch.Resource = createResource({
  icon: 'SwitchSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  ],
})
