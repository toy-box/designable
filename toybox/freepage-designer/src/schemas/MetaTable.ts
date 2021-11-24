import { ISchema } from '@formily/react'
import { Button } from './Button'

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
      default: false,
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    operate: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          'x-component': 'ArrayItems',
          'x-decorator-props': {
            layout: 'vertical',
            wrapperAlign: 'left',
            wrapperWidth: '100%',
            wrapperStyle: { flexDirection: 'column' },
          },
          properties: {
            addition: {
              type: 'void',
              'x-component': 'ArrayItems.Addition',
            },
          },
          items: {
            type: 'object',
            properties: Button.properties,
          },
        },
        max: {
          type: 'number',
          default: 3,
          'x-component': 'NumberPicker',
          'x-decorator': 'FormItem',
        },
        group: {
          type: 'boolean',
          'x-component': 'Switch',
          'x-decorator': 'FormItem',
        },
      },
      'x-component': 'Container',
      'x-decorator-props': {
        layout: 'vertical',
        wrapperAlign: 'left',
        wrapperWidth: '100%',
      },
      'x-reactions': [
        {
          dependencies: ['.isOperation'],
          fulfill: {
            state: {
              value: undefined,
              visible: '{{$deps[0]}}',
            },
          },
        },
      ],
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
