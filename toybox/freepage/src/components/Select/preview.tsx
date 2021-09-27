import React from 'react'
import { FieldSelect } from '@toy-box/freepage-components'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@toy-box/designable-react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Select: DnFC<React.ComponentProps<typeof FieldSelect>> =
  FieldSelect

Select.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Select),
  },
  designerLocales: AllLocales.Select,
})

Select.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
    },
  ],
})
