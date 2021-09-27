export const Text = {
  'zh-CN': {
    title: '文本',
    settings: {
      'x-component-props': {
        type: {
          title: '类型',
          dataSource: [
            { label: '标题1', value: 'H1' },
            { label: '标题2', value: 'H2' },
            { label: '标题3', value: 'H3' },
            { label: '标题4', value: 'H4' },
            { label: '标题5', value: 'H5' },
            { label: '文本', value: 'Text' },
            { label: '段落', value: 'Paragraph' },
          ],
        },
        content: '内容',
        code: '代码',
        delete: '删除线',
        mark: '标记',
        underline: '下划线',
        italics: '斜体',
        color: {
          title: '颜色',
          dataSource: [
            { label: 'Default', value: 'default' },
            { label: 'Success', value: 'success' },
            { label: 'Warnging', value: 'warnging' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Danger', value: 'danger' },
          ],
        },
        strong: '粗体',
        ellipsis: '溢出省略',
      },
    },
  },
  'en-US': {
    title: 'Text',
    settings: {
      'x-component-props': {
        type: {
          title: 'Type',
          dataSource: [
            { label: 'H1', value: 'H1' },
            { label: 'H2', value: 'H2' },
            { label: 'H3', value: 'H3' },
            { label: 'H4', value: 'H4' },
            { label: 'H5', value: 'H5' },
            { label: 'Text', value: 'Text' },
            { label: 'Paragraph', value: 'Paragraph' },
          ],
        },
        content: 'Content',
        code: 'Code Style',
        delete: 'Delete Style',
        mark: 'Mark Style',
        underline: 'Underline Style',
        italics: 'Italics Style',
        color: {
          title: 'Color',
          dataSource: [
            { label: 'Default', value: 'default' },
            { label: 'Success', value: 'success' },
            { label: 'Warnging', value: 'warnging' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Danger', value: 'danger' },
          ],
        },
        strong: 'Strong',
        ellipsis: 'Ellipsis',
      },
    },
  },
}
