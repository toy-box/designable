import { ISchema } from '@formily/react'

export const DataGrid: ISchema = {
  type: 'object',
  properties: {
    filterFields: {
      type: 'array<string>',
      'x-decorator': 'FormItem',
      'x-component': 'FieldPickSetter',
      'x-decorator-props': {
        layout: 'vertical',
      },
      'x-reactions': [
        {
          dependencies: [
            'dataSource.type,',
            'dataSource.schema',
            'dataSource.repository',
          ],
          fulfill: {
            state: {
              value: null,
            },
          },
        },
      ],
    },
  },
}
