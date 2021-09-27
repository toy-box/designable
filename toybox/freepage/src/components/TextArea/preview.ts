import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { FieldText } from '@toy-box/freepage-components'
import { DnFC } from '@toy-box/designable-react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const TextArea: DnFC<React.ComponentProps<typeof FieldText>> = FieldText

TextArea.Behavior = createBehavior({
  name: 'TextArea',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TextArea',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.TextArea),
  },
  designerLocales: AllLocales.TextArea,
})

TextArea.Resource = createResource({
  icon: 'TextAreaSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'TextArea',
        'x-decorator': 'FormItem',
        'x-component': 'TextArea',
      },
    },
  ],
})
