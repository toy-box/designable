import React from 'react'
import { FieldPercent } from '@toy-box/meta-components'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@toy-box/designable-react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Percent: DnFC<React.ComponentProps<typeof FieldPercent>> =
  FieldPercent

Percent.Behavior = createBehavior({
  name: 'Percent',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Percent',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Percent),
  },
  designerLocales: AllLocales.Percent,
})

Percent.Resource = createResource({
  icon: 'NumberPickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'Percent',
        'x-decorator': 'FormItem',
        'x-component': 'Percent',
      },
    },
  ],
})
