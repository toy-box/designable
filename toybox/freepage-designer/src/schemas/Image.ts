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
    staticSrc: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': [
        {
          dependencies: ['type'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === "static"}}',
            },
          },
        },
      ],
    },
    preview: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
