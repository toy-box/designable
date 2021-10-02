// loadMetaRepoList: (name?: string) => Promise<MetaRepo[]>
// loadMetaSchema: (objectKey: string) => Promise<IObjectMeta>
// loadMetaRepoListByValue: (ids: string[]) => Promise<MetaRepo[]>
// loadMataData: (objectKey: string, id: string) => Promise<any>
// loadMetaDataList: (objectKey: string, filter: ILogicFilter) => Promise<any>

const repolist = [
  {
    label: '用户',
    value: 'user',
  },
  {
    label: '部门',
    value: 'department',
  },
]

const userSchema = {
  key: 'user',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      key: 'id',
      type: 'string',
      name: 'ID',
    },
    name: {
      key: 'name',
      type: 'string',
      name: '姓名',
    },
    department: {
      key: 'department',
      type: 'string',
      name: '部门',
    },
  },
}

const departmentSchema = {
  key: 'department',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      key: 'id',
      type: 'string',
      name: 'ID',
    },
    name: {
      key: 'name',
      type: 'string',
      name: '部门名称',
    },
    manager: {
      key: 'manager',
      type: 'string',
      name: '负责人',
    },
  },
}

const schemas = {
  user: userSchema,
  department: departmentSchema,
}

export const loadMetaRepoList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(repolist)
    }, 500)
  })
}

export const loadMetaRepoListByValue = (ids: string[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(repolist.filter((repo) => ids.some((id) => id === repo.value)))
    }, 1000)
  })
}

export const loadMetaSchema = (key: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(schemas[key])
    }, 500)
  })
}
