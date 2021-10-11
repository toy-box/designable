import {
  IObjectMeta,
  ILogicFilter,
  IMetaPageableResult,
  IMetaListResult,
  IMetaObjectResult,
} from '@toy-box/meta-schema'
import {
  IPageResult,
  IPageable,
} from '@toy-box/meta-components/es/components/index-view/types'

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
  loadMataData: (objectKey: string, id: string) => Promise<IMetaObjectResult>
  loadMetaDataList: (
    objectKey: string,
    filter: ILogicFilter
  ) => Promise<IMetaListResult>
  loadMetaDataPageable: (
    objectKey: string,
    pageable: IPageable,
    filter: ILogicFilter
  ) => Promise<IPageResult>
}
