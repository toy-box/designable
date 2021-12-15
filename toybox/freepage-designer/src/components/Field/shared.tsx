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
              tab: makeIconTabPane(
                'Flashlight',
                'SettingComponents.Properties'
              ),
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
                    type: 'string',
                    'x-component': 'VisibilitySetter',
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

export const createInnerSchema = (
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
              tab: makeIconTabPane(
                'Flashlight',
                'SettingComponents.Properties'
              ),
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
            },
          },
          'field-styles': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Brush', 'SettingComponents.Style'),
            },
            // properties: {
            //   ...createStyleSchema(component, decorator),
            // },
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
              tab: makeIconTabPane(
                'Flashlight',
                'SettingComponents.Properties'
              ),
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
                  visibility: {
                    type: 'string',
                    'x-component': 'VisibilitySetter',
                  },
                },
              },
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

export const createDataSourceSchema = (
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
              tab: makeIconTabPane('Layout', 'SettingComponents.Layout'),
            },
            properties: {
              ...createComponentSchema(component, decorator),
              'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                  visibility: {
                    type: 'string',
                    'x-component': 'VisibilitySetter',
                  },
                },
              },
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
              tab: makeIconTabPane(
                'Flashlight',
                'SettingComponents.Properties'
              ),
            },
            properties: {
              'component-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: component.properties,
              },
            },
          },
          'field-styles': {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: makeIconTabPane('Brush', 'SettingComponents.Style'),
            },
            properties: {
              'component-style-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                  style: AllSchemas.CSSStyle,
                },
              },
            },
          },
        },
      },
    },
  }
}
