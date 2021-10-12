export const DataGrid = {
  'zh-CN': {
    title: '业务表格',
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
        columns: '表格列',
        filterFields: '筛选字段',
      },
    },
  },
  'en-US': {
    title: 'DataGrid',
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
        columns: 'Columns',
        filterFields: 'Filter Fields',
      },
    },
  },
}
