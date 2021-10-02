import { IObjectMeta, ILogicFilter } from '@toy-box/meta-schema'

export interface MetaRepo {
  id: string
  name: string
}

// TODO: 修正类型
export interface IMetaContext {
  loadMetaRepoList: (name?: string) => Promise<MetaRepo[]>
  loadMetaSchema: (objectKey: string) => Promise<IObjectMeta>
  loadMetaRepoListByValue: (ids: string[]) => Promise<MetaRepo[]>
  loadMataData: (objectKey: string, id: string) => Promise<any>
  loadMetaDataList: (objectKey: string, filter: ILogicFilter) => Promise<any>
}
