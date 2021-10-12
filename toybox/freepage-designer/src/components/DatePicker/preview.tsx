import React from 'react'
import { FieldDate } from '@toy-box/freepage-components'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@toy-box/designable-react'
import { createFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const DatePicker: DnFC<React.ComponentProps<typeof FieldDate>> =
  FieldDate

DatePicker.Behavior = createBehavior({
  name: 'DatePicker',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'DatePicker',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.DatePicker),
  },
  designerLocales: AllLocales.DatePicker,
})

DatePicker.Resource = createResource({
  icon: 'DatePickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'DatePicker',
        'x-decorator': 'FormItem',
        'x-component': 'DatePicker',
      },
    },
  ],
})
