// loadMetaRepoList: (name?: string) => Promise<MetaRepo[]>
// loadMetaSchema: (objectKey: string) => Promise<IObjectMeta>
// loadMetaRepoListByValue: (ids: string[]) => Promise<MetaRepo[]>
// loadMataData: (objectKey: string, id: string) => Promise<any>
// loadMetaDataList: (objectKey: string, filter: ILogicFilter) => Promise<any>
import { IPageResult } from '@toy-box/meta-components/es/components/index-view/types'

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

const userData = [
  {
    id: 'user-1',
    name: '李强',
    department: '综合部',
  },
  {
    id: 'user-2',
    name: '罗远明',
    department: '综合部',
  },
  {
    id: 'user-3',
    name: '廖琴',
    department: '开发部',
  },
  {
    id: 'user-4',
    name: '黄轩',
    department: '开发部',
  },
]

const departmentData = [
  {
    id: 'dep-1',
    name: '综合部',
    manager: '李强',
  },
  {
    id: 'dep-2',
    name: '开发部',
    department: '黄轩',
  },
]

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

export const loadMetaRepoListByValue = (ids: string[] | string = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Array.isArray(ids)) {
        resolve(repolist.filter((repo) => ids.some((id) => id === repo.value)))
      } else {
        resolve(repolist.find((repo) => repo.value === ids))
      }
    }, 300)
  })
}

export const loadMetaSchema = (key: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(schemas[key])
    }, 300)
  })
}

export const loadMetaData = (objectKey: string, id: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (objectKey) {
        case 'user':
          resolve(userData.find((user) => user.id === id))
        case 'department':
          resolve(departmentData.find((department) => department.id === id))
        default:
          reject('404')
      }
    }, 300)
  })
}

export const loadMetaDataList = (
  objectKey: string,
  pageable: any,
  filter: any
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (objectKey) {
        case 'user':
          resolve(userData)
        case 'department':
          resolve(departmentData)
        default:
          reject('404')
      }
    }, 300)
  })
}

export const loadMetaDataPageable = (
  objectKey: string,
  pageable: any,
  filter: any
): Promise<IPageResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (objectKey) {
        case 'user':
          resolve({
            list: userData,
            current: 1,
            pageSize: 10,
            total: userData.length,
          })
        case 'department':
          resolve({
            list: departmentData,
            current: 1,
            pageSize: 10,
            total: departmentData.length,
          })
        default:
          reject('404')
      }
    }, 300)
  })
}
