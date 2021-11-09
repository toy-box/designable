import { ISchema } from '@formily/react'

export const MetaTable: ISchema & { Column?: ISchema } = {
  type: 'object',
  properties: {
    columns: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'TableColumnSetter',
      'x-decorator-props': {
        layout: 'vertical',
        wrapperAlign: 'left',
        wrapperWidth: '100%',
      },
    },
    isOperation: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
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
    key: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DataGridFieldBindSetter',
    },
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
  },
}

MetaTable.Column = Column
