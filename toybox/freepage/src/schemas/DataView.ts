import { ISchema } from '@formily/react'

export const DataView: ISchema = {
  type: 'object',
  properties: {
    'x-component-props': {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['repository', 'raw'],
          default: 'raw',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
        },
        scheam: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
        },
        repositoryId: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'SelectPro',
          'x-component-props': {
            remote: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: '用户',
                      value: 'user',
                    },
                    {
                      label: '部门',
                      value: 'department',
                    },
                  ])
                }, 1000)
              })
            },
            remoteByValue: (ids: string[]) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    [
                      {
                        label: '用户',
                        value: 'user',
                      },
                      {
                        label: '部门',
                        value: 'department',
                      },
                    ].filter((repo) => ids.some((id) => id === repo.value))
                  )
                }, 1000)
              })
            },
          },
        },
      },
    },
  },
}
