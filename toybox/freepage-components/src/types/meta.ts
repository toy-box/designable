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

export interface MetaRepository {
  id: string
  name: string
}

export interface IMetaSchemaOption {
  loadMetaRepoList: (name?: string) => Promise<MetaRepository[]>
  loadMetaSchema: (objectKey: string) => Promise<IObjectMeta>
  loadMetaRepoListByValue: (ids: string[]) => Promise<MetaRepository[]>
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
