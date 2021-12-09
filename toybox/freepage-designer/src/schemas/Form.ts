import { ISchema } from '@formily/react'

export const Form: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    parameters: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ParamsSetter',
      'x-decorator-props': {
        layout: 'vertical',
        wrapperAlign: 'left',
        wrapperWidth: '100%',
      },
    },
  },
}
