export const Button = {
  'zh-CN': {
    title: '按钮',
    settings: {
      'x-component-props': {
        type: {
          title: '按钮类型',
          dataSource: [
            { label: '默认', value: 'default' },
            { label: '主色调', value: 'primary' },
            { label: '文本', value: 'text' },
            { label: '虚线', value: 'dashed' },
            { label: '透明', value: 'ghost' },
          ],
        },
        danger: '危险色',
        disable: '禁用',
        size: '尺寸',
      },
    },
  },
  'en-US': {
    title: 'Button',
    settings: {
      'x-component-props': {
        type: {
          title: 'Type',
          dataSource: [
            { label: 'Default', value: 'default' },
            { label: 'Primary', value: 'primary' },
            { label: 'Text', value: 'text' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        danger: 'Danger',
        disable: 'Disable',
        size: 'Size',
      },
    },
  },
}
