export const Image = {
  'zh-CN': {
    title: '图片',
    settings: {
      'x-component-props': {
        type: {
          title: '类型',
          dataSource: [
            { label: '固定图片', value: 'static' },
            { label: '动态图片', value: 'dynamic' },
          ],
        },
        src: '图片源',
        preview: '预览',
      },
    },
  },
  'en-US': {
    title: 'Image',
    settings: {
      'x-component-props': {
        type: {
          title: 'Type',
          dataSource: [
            { label: 'Static', value: 'static' },
            { label: 'Dynamic', value: 'dynamic' },
          ],
        },
        src: 'Image Source',
        preview: 'Preview',
      },
    },
  },
}
