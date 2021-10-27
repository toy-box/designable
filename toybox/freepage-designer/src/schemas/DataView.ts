import { ISchema } from '@formily/react'

export const DataView: ISchema = {
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
    dataValueSource: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['paramId', 'paramValue'],
          default: 'paramId',
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
        path: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}
