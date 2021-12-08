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
              { label: '通过ID获取数据', value: 'paramId' },
              { label: '直接获取数据', value: 'paramValue' },
            ],
          },
          parameterKey: '关联页面参数',
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
              { label: 'Object ID', value: 'paramId' },
              { label: 'Object Value', value: 'paramValue' },
            ],
          },
          parameterKey: 'Parameter Key',
        },
      },
    },
  },
}
