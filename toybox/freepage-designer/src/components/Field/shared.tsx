import React from 'react'
import { ISchema } from '@formily/json-schema'
import { IconWidget, TextWidget } from '@toy-box/designable-react'
import * as AllSchemas from '../../schemas'

export const makeIconTabPane = (icon: string, text?: string) => {
  const tooltip = text ? <TextWidget token={text} /> : null
  return <IconWidget infer={icon} size={20} tooltip={tooltip} />
}

export const createStyleSchema = (component?: ISchema, decorator?: ISchema) => {
  return {
    'component-style-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: component != null },
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
    'decorator-style-group': decorator && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: component == null },
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
  }
}

export const createFieldSchema = (
  component?: ISchema,
  decorator: ISchema = AllSchemas.FormItem
): ISchema => {
  return {
    type: 'object',
    properties: {
      'field-tabs': {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          centered: true,
        },
        properties: {
          'field-attribute': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Profile', 'SettingComponents.Profile'),
            },
            properties: {
              'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
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
                    enum: [
                      'editable',
                      'disabled',
                      'readOnly',
                      'readPretty',
                      '',
                    ],
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
            },
          },
          'field-component': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Flashlight', 'SettingComponents.Component'),
            },
            properties: {
              ...createComponentSchema(component, decorator),
            },
          },
          'field-styles': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Brush', 'SettingComponents.Style'),
            },
            properties: {
              ...createStyleSchema(component, decorator),
            },
          },
        },
      },
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
      'field-tabs': {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          centered: true,
        },
        properties: {
          'field-attribute': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Profile', 'SettingComponents.Profile'),
            },
            properties: {
              'field-component': {
                type: 'void',
                'x-component': 'FormTab.TabPane',
                'x-component-props': {
                  tab: makeIconTabPane(
                    'Flashlight',
                    'SettingComponents.Component'
                  ),
                },
                properties: {
                  ...createComponentSchema(component, decorator),
                },
              },
              'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                  title: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-reactions': {
                      fulfill: {
                        state: {
                          visible:
                            '{{$form.values["x-decorator"] === "FormItem"}}',
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
                },
              },
            },
          },
          'field-styles': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Brush', 'Style'),
            },
            properties: {
              ...createStyleSchema(component, decorator),
            },
          },
        },
      },
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
      'field-tabs': {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          centered: true,
        },
        properties: {
          'field-component': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Flashlight', 'Component'),
            },
            properties: {
              ...createComponentSchema(component, decorator),
            },
          },
          'field-attribute': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Profile', 'SettingComponents.Profile'),
            },
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
                  visibility: {
                    'x-component': 'VisibilitySetter',
                  },
                },
              },
            },
          },
        },
      },
    },
  }
}

export const createPageFieldSchema = (component: ISchema) => {
  return {
    type: 'object',
    properties: {
      'field-tabs': {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          centered: true,
        },
        properties: {
          'field-attribute': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Profile', 'SettingComponents.Profile'),
            },
            properties: {
              'field-group': {
                type: 'void',
                properties: component.properties,
              },
            },
          },
          'field-component': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Flashlight', 'SettingComponents.Component'),
            },
            properties: AllSchemas.FormLayout.properties,
          },
          'field-styles': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Brush', 'SettingComponents.Style'),
            },
            properties: {
              style: AllSchemas.CSSStyle,
            },
          },
        },
      },
    },
  }
}
