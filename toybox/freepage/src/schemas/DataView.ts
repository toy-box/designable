import { ISchema } from '@formily/react'

export const DataView: ISchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['repository', 'raw'],
      default: 'repository',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
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
              visible: '{{$deps[0] === "raw"}}',
            },
          },
        },
        {
          dependencies: ['.type'],
          when: '{{$deps[0] !== "raw"}}',
          fulfill: {
            state: {
              value: null,
            },
          },
        },
      ],
    },
    repository: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'RepositoryInput',
      'x-reactions': [
        {
          dependencies: ['.type'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === "repository"}}',
            },
          },
        },
        {
          dependencies: ['.type'],
          when: '{{$deps[0] !== "repository"}}',
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
