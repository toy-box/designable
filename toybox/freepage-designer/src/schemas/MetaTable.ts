import { ISchema } from '@formily/react'
import { Button } from './Button'

export const MetaTable: ISchema & { Column?: ISchema } = {
  type: 'void',
  properties: {
    'x-component-props': {
      type: 'object',
      properties: {
        'column-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          properties: {
            columns: {
              type: 'array',
              'x-decorator': 'FormItem',
              'x-component': 'TableColumnSetter',
              'x-decorator-props': {
                layout: 'vertical',
                wrapperAlign: 'left',
                wrapperWidth: '100%',
              },
            },
          },
        },
        'operate-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          properties: {
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
                      'x-component-props': {
                        type: 'primary',
                      },
                    },
                  },
                  items: {
                    type: 'object',
                    properties: {
                      itemContainer: {
                        type: 'void',
                        'x-component': 'ArrayItemContiner',
                        properties: {
                          ...(Button.properties as Record<string, any>),
                          remove: {
                            type: 'void',
                            'x-component': 'ArrayItemRemove',
                            'x-component-props': {
                              danger: true,
                              type: 'dashed',
                              style: {
                                margin: '0 20px',
                                width: 'calc(100% - 40px)',
                                marginBottom: '8px',
                              },
                            },
                          },
                        },
                      },
                    },
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
        },
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
