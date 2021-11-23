import { ActionType, LinkTarget } from '@toy-box/freepage-components'

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
              { label: '无', value: ActionType.Nothing },
              { label: '页面', value: ActionType.Page },
              { label: '链接', value: ActionType.Link },
              { label: '自动流', value: ActionType.Autoflow },
            ],
          },
          pageAction: {
            page: '页面',
            params: '页面参数',
          },
          linkAction: {
            target: {
              title: '链接打开目标',
              dataSource: [
                {
                  label: '新窗口',
                  value: LinkTarget.Blank,
                },
                {
                  label: '当前窗口',
                  value: LinkTarget.Self,
                },
              ],
            },
            url: {
              title: '链接地址',
            },
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
        shape: {
          title: '形状',
          dataSource: [
            { label: '默认', value: 'default' },
            { label: '圆形', value: 'circle' },
            { label: '圆角', value: 'round' },
          ],
        },
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
              { label: 'Nothing', value: ActionType.Nothing },
              { label: 'Page', value: ActionType.Page },
              { label: 'Link', value: ActionType.Link },
              { label: 'Autoflow', value: ActionType.Autoflow },
            ],
          },
          pageAction: {
            page: 'Page',
            params: 'Page Parameters',
          },
          linkAction: {
            target: {
              title: 'Target',
              dataSource: [
                {
                  label: 'Blank',
                  value: LinkTarget.Blank,
                },
                {
                  label: 'Self',
                  value: LinkTarget.Self,
                },
              ],
            },
            url: {
              title: 'URL',
            },
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
        shape: {
          title: 'Shape',
          dataSource: [
            { label: 'Default', value: 'default' },
            { label: 'Circle', value: 'circle' },
            { label: 'Round', value: 'round' },
          ],
        },
        ghost: 'Ghost',
      },
    },
  },
}
