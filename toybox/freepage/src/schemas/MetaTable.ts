import { ISchema } from '@formily/react'

export const MetaTable: ISchema & { Column?: ISchema } = {
  type: 'object',
  properties: {
    columns: {
      type: 'void',
      title: 'Columns',
      'x-decorator': 'FormItem',
      'x-component': 'TableColumnSetter',
      'x-decorator-props': {
        layout: 'vertical',
        wrapperAlign: 'left',
        wrapperWidth: '100%',
      },
    },
  },
}

const Column: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    field: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DataGridFieldBindSetter',
    },
  },
}

MetaTable.Column = Column
