import { IObjectMeta, ILogicFilter } from '@toy-box/meta-schema'

export interface MetaRepo {
  id: string
  name: string
}

// TODO: 修正类型
export type MetaContextProps = IMetaSchemaOption & IMetaDataOption

export interface IMetaSchemaOption {
  loadMetaRepoList: (name?: string) => Promise<MetaRepo[]>
  loadMetaSchema: (objectKey: string) => Promise<IObjectMeta>
  loadMetaRepoListByValue: (ids: string[]) => Promise<MetaRepo[]>
}

export interface IMetaDataOption {
  loadMataData: (objectKey: string, id: string) => Promise<any>
  loadMetaDataList: (
    objectKey: string,
    pageable: any,
    filter: any
  ) => Promise<any>
}
