import { ISchema } from '@formily/react'

export const Button: ISchema = {
  type: 'object',
  properties: {
    action: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['', 'page', 'autoflow', 'others'],
          default: '',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          'x-decorator-props': {
            layout: 'vertical',
          },
        },
      },
    },
    caption: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    type: {
      type: 'string',
      enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    size: {
      type: 'string',
      enum: ['large', 'middle', 'small'],
      default: 'middle',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    ghost: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    danger: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    block: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    shape: {
      type: 'string',
      enum: ['default', 'circle', 'round'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}
