export const DataGrid = {
  'zh-CN': {
    title: '网格数据',
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
        columns: '表格列',
        filterFields: '筛选字段',
      },
    },
  },
  'en-US': {
    title: 'DataGrid',
    settings: {
      'x-component-props': {
        name: 'Name',
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
        columns: 'Columns',
        filterFields: 'Filter Fields',
      },
    },
  },
}
