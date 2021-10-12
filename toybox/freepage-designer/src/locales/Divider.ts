export const Divider = {
  'zh-CN': {
    title: '分割线',
    settings: {
      'x-component-props': {
        caption: '文本',
        type: {
          title: '按钮类型',
          dataSource: [
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
          ],
        },
        orientation: {
          title: '标题位置',
          dataSource: [
            { label: '居中', value: 'center' },
            { label: '左侧', value: 'left' },
            { label: '右侧', value: 'right' },
          ],
        },
        dashed: '虚线',
        plain: '普通正文',
      },
    },
  },
  'en-US': {
    title: 'Divider',
    settings: {
      'x-component-props': {
        caption: 'Caption',
        type: {
          title: 'Type',
          dataSource: [
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
          ],
        },
        orientation: {
          title: 'Orientation',
          dataSource: [
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        dashed: 'Dashed',
        plain: 'Plain content',
      },
    },
  },
}
