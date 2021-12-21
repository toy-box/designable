import { Button } from './Button'

export const MetaTable = {
  'zh-CN': {
    title: '元数据表格',
    settings: {
      'x-component-props': {
        'column-group': '表格数据列',
        'operate-group': '行操作',
        isOperation: {
          title: '启用行操作',
        },
        operate: {
          items: {
            ...Button['zh-CN'].settings['x-component-props'],
            remove: '移除',
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
        'column-group': 'Colums',
        'operate-group': 'Row Operation',
        isOperation: 'Enable Operation',
        operate: {
          items: {
            ...Button['en-US'].settings['x-component-props'],
            remove: 'Remove',
            addition: 'Add Button',
          },
          max: 'Max',
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
