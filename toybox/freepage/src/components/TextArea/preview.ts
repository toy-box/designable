import React from 'react'
import { Input as FormilyInput } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const TextArea: DnFC<
  React.ComponentProps<typeof FormilyInput.TextArea>
> = FormilyInput.TextArea

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
