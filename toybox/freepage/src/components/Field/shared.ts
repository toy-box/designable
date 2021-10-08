import { ISchema } from '@formily/json-schema'
import { FormItemSwitcher } from '../../common/FormItemSwitcher'
import * as AllSchemas from '../../schemas'

export const createComponentSchema = (
  component: ISchema,
  decorator: ISchema
) => {
  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props': component,
      },
    },
    'decorator-group': decorator && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        'x-decorator-props': decorator,
      },
    },
    'component-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props.style': AllSchemas.CSSStyle,
      },
    },
    'decorator-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        'x-decorator-props.style': AllSchemas.CSSStyle,
      },
    },
  }
}

export const createFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          field: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'FieldBindSetter',
          },
          visibility: {
            'x-component': 'VisibilitySetter',
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  }
}

export const createVoidFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
) => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values["x-decorator"] === "FormItem"}}',
                },
              },
            },
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values["x-decorator"] === "FormItem"}}',
                },
              },
            },
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          'x-decorator': {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': FormItemSwitcher,
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  }
}

export const createDataShourceSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          field: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'FieldBindSetter',
          },
          visibility: {
            'x-component': 'VisibilitySetter',
          },
          dataSource: {
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
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  }
}
