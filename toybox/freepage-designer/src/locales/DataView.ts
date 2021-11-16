export const DataView = {
  'zh-CN': {
    title: '业务数据',
    settings: {
      'x-component-props': {
        name: '名称',
        metaOption: {
          type: {
            title: '数据模型',
            dataSource: [
              {
                label: '业务对象',
                value: 'repository',
              },
              {
                label: '原始数据',
                value: 'schema',
              },
            ],
          },
          scheam: 'Schema',
          repository: '业务对象',
        },
        dataValueSource: {
          type: {
            title: '数据来源类型',
            dataSource: [
              { label: '页面参数ID', value: 'paramId' },
              { label: '页面参数值', value: 'paramValue' },
            ],
          },
          path: '数据来源',
        },
      },
    },
  },
  'en-US': {
    title: 'DataView',
    settings: {
      'x-component-props': {
        name: 'Title',
        metaOption: {
          type: {
            title: 'Meta',
            dataSource: [
              {
                label: 'Meta Repository',
                value: 'repository',
              },
              {
                label: 'Meta Schema',
                value: 'schema',
              },
            ],
          },
          scheam: 'Schema',
          repository: 'Repository',
        },
        dataValueSource: {
          type: {
            title: 'DataSource Type',
            dataSource: [
              { label: 'Page Param ID', value: 'paramId' },
              { label: 'Page Param Value', value: 'paramValue' },
            ],
          },
          path: 'DataSource',
        },
      },
    },
  },
}
