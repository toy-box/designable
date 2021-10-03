export const Button = {
  'zh-CN': {
    title: '按钮',
    settings: {
      'x-component-props': {
        caption: '标题',
        action: {
          type: {
            title: '点击操作',
            dataSource: [
              { label: '无', value: '' },
              { label: '页面', value: 'page' },
              { label: '自动流', value: 'autoflow' },
              { label: '链接', value: 'link' },
              { label: '其他', value: 'others' },
            ],
          },
        },
        type: {
          title: '按钮类型',
          dataSource: [
            { label: '默认', value: 'default' },
            { label: '主色调', value: 'primary' },
            { label: '透明', value: 'ghost' },
            { label: '虚线', value: 'dashed' },
            { label: '链接', value: 'link' },
            { label: '文本', value: 'text' },
          ],
        },
        danger: '危险色',
        disabled: '禁用',
        size: '尺寸',
        block: '块',
        shape: '形状',
        ghost: '反色',
      },
    },
  },
  'en-US': {
    title: 'Button',
    settings: {
      'x-component-props': {
        caption: 'Caption',
        action: {
          type: {
            title: 'Click Action',
            dataSource: [
              { label: 'Nothing', value: '' },
              { label: 'Page', value: 'page' },
              { label: 'Autoflow', value: 'autoflow' },
              { label: 'Link', value: 'link' },
              { label: 'Others', value: 'others' },
            ],
          },
        },
        type: {
          title: 'Type',
          dataSource: [
            { label: 'Default', value: 'default' },
            { label: 'Primary', value: 'primary' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Link', value: 'link' },
            { label: 'Text', value: 'text' },
          ],
        },
        danger: 'Danger',
        disabled: 'Disable',
        size: 'Size',
        block: 'Block',
        shape: 'Shape',
        ghost: 'Ghost',
      },
    },
  },
}
