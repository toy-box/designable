import { Button } from './Button'

export const MetaTable = {
  'zh-CN': {
    title: '元数据表格',
    settings: {
      'x-component-props': {
        columns: '表格列',
        isOperation: '行操作',
        operate: {
          items: {
            ...Button['zh-CN'].settings['x-component-props'],
            addition: '添加按钮',
          },
          max: '最大显示数',
          group: '组合',
        },
      },
    },
  },
  'en-US': {
    title: 'MetaTable',
    settings: {
      'x-component-props': {
        columns: 'Columns',
        isOperation: 'Row Operation',
        operate: {
          items: {
            ...Button['en-US'].settings['x-component-props'],
          },
          max: 'Max Display',
          group: 'Group',
        },
      },
    },
  },
}

export const MetaTableColumn = {
  'zh-CN': {
    title: '表格列',
    settings: {
      'x-component-props': {
        title: '列名',
        key: '字段绑定',
        width: '宽度',
      },
    },
  },
  'en-US': {
    title: 'Column',
    settings: {
      'x-component-props': {
        title: 'Title',
        key: 'Field Bind',
        width: 'Width',
      },
    },
  },
}
