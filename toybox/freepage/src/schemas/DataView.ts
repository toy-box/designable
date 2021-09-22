import { ISchema } from '@formily/react'

export const DataView: ISchema = {
  type: 'object',
  properties: {
    metaRepository: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
