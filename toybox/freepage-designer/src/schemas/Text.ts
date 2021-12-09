import { GlobalRegistry } from '@designable/core'
import { ISchema } from '@formily/react'

export const Text: ISchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['H1', 'H2', 'H3', 'H4', 'H5', 'Text', 'Paragraph'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
    color: {
      type: 'string',
      enum: ['primary', 'success', 'warning', 'secondary', 'danger'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    delete: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    code: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    mark: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    italic: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    strong: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    underline: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    ellipsis: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
