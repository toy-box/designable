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
              label: '业务对象',
              value: 'repository',
            },
            {
              label: '原始数据',
              value: 'raw',
            },
          ],
        },
        scheam: 'Schema',
        repository: '业务对象',
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
              label: 'Repository',
              value: 'repository',
            },
            {
              label: 'Raw Schema',
              value: 'raw',
            },
          ],
        },
        scheam: 'Schema',
        repository: 'Repository Object',
      },
    },
  },
}
