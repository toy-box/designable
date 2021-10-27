import { ISchema } from '@formily/react'

export const DataGrid: ISchema = {
  type: 'object',
  properties: {
    metaOption: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['entity', 'schema'],
          default: 'entity',
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
        scheam: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-reactions': [
            {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "schema"}}',
                },
              },
            },
            {
              dependencies: ['.type'],
              when: '{{$deps[0] !== "schema"}}',
              fulfill: {
                state: {
                  value: null,
                },
              },
            },
          ],
        },
        entityId: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'RepositoryInput',
          'x-reactions': [
            {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "entity"}}',
                },
              },
            },
            {
              dependencies: ['.type'],
              when: '{{$deps[0] !== "entity"}}',
              fulfill: {
                state: {
                  value: null,
                },
              },
            },
          ],
        },
      },
    },
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
