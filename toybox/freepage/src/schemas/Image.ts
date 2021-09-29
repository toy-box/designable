import { ISchema } from '@formily/react'

export const Image: ISchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['static', 'dynamic'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    preview: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
