import { ISchema } from '@formily/react'
import { ActionType, LinkTarget } from '@toy-box/freepage-components'

export const Button: ISchema = {
  type: 'object',
  properties: {
    caption: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    enableConfirm: {
      type: 'boolean',
      default: false,
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    confirmMessage: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-decorator-props': {
        layout: 'vertical',
      },
      'x-reactions': {
        dependencies: ['.enableConfirm'],
        fulfill: {
          state: {
            visible: '{{ $deps[0] }}',
          },
        },
      },
    },
    action: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: [
            ActionType.Nothing,
            ActionType.Page,
            ActionType.Link,
            ActionType.Autoflow,
          ],
          default: '',
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
        pageAction: {
          type: 'object',
          properties: {
            page: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'PageInput',
            },
            parameters: {
              type: 'array',
              'x-decorator': 'FormItem',
              'x-component': 'ParamsBindSetter',
              'x-decorator-props': {
                layout: 'vertical',
              },
              'x-reactions': {
                dependencies: ['.page'],
                fulfill: {
                  state: {
                    componentProps: '{{{ remoteId: $deps[0] }}}',
                  },
                },
              },
            },
          },
          'x-reactions': [
            {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "page"}}',
                },
              },
            },
            {
              dependencies: ['.type'],
              when: '{{$deps[0] !== "page"}}',
              fulfill: {
                state: {
                  value: undefined,
                },
              },
            },
          ],
        },
        linkAction: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              enum: [LinkTarget.Blank, LinkTarget.Self],
              default: LinkTarget.Blank,
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
            url: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
          'x-reactions': [
            {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "link"}}',
                },
              },
            },
            {
              dependencies: ['.type'],
              when: '{{$deps[0] !== "link"}}',
              fulfill: {
                state: {
                  value: undefined,
                },
              },
            },
          ],
        },
        flowAction: {
          type: 'object',
          properties: {
            autoflowId: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
          'x-reactions': [
            {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "flow"}}',
                },
              },
            },
            {
              dependencies: ['.type'],
              when: '{{$deps[0] !== "flow"}}',
              fulfill: {
                state: {
                  value: undefined,
                },
              },
            },
          ],
        },
      },
    },
    type: {
      type: 'string',
      enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
      default: 'default',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    size: {
      type: 'string',
      enum: ['large', 'middle', 'small'],
      default: 'middle',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    ghost: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    danger: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    block: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    shape: {
      type: 'string',
      enum: ['default', 'circle', 'round'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}
