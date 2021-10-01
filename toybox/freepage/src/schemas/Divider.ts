import { ISchema } from '@formily/react'

export const Divider: ISchema = {
  type: 'object',
  properties: {
    caption: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    type: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    orientation: {
      type: 'string',
      enum: ['center', 'left', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    dashed: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    plain: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
