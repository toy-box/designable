import { IObjectMeta, ILogicFilter } from '@toy-box/meta-schema'

// TODO: 修正类型
export interface IMetaContext {
  loadMeta: (objectKey: string) => IObjectMeta
  loadData: (objectKey: string, id: string) => any
  loadDataList: (objectKey: string, filter: ILogicFilter) => any
}
