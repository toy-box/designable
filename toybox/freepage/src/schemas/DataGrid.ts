import { ISchema } from '@formily/react'

export const DataGrid: ISchema = {
  type: 'object',
  properties: {
    filterFields: {
      type: 'array',
      'x-component': 'FieldPickSetter',
    },
  },
}
