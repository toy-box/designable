export const DataView = {
  'zh-CN': {
    title: '业务数据',
    settings: {
      'x-component-props': {
        name: '名称',
        type: {
          title: '数据源类型',
          dataSource: [
            {
              label: '原始数据',
              value: 'raw',
            },
            {
              label: '业务对象',
              value: 'repository',
            },
          ],
        },
        scheam: 'Schema',
        repositoryId: '业务对象',
      },
    },
  },
  'en-US': {
    title: 'DataView',
    settings: {
      'x-component-props': {
        name: '名称',
        type: {
          title: 'DataSource Type',
          dataSource: [
            {
              label: 'Raw Schema',
              value: 'raw',
            },
            {
              label: 'Repository',
              value: 'repository',
            },
          ],
        },
        scheam: 'Schema',
        repositoryId: 'Repository Object',
      },
    },
  },
}
