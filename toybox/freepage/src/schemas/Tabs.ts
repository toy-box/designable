import { ISchema } from '@formily/react'

export const Tabs: ISchema & { TabPane?: ISchema } = {
  type: 'object',
  properties: {
    animated: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    centered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
    type: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'line',
        optionType: 'button',
      },
    },
    panes: {
      type: 'void',
      title: 'Tabs',
      'x-decorator': 'FormItem',
      'x-component': 'TabsPaneSetter',
      'x-decorator-props': {
        layout: 'vertical',
        wrapperAlign: 'left',
        wrapperWidth: '100%',
      },
    },
  },
}

Tabs.TabPane = {
  type: 'object',
  properties: {
    tab: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
