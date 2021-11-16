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
import { IFieldMeta } from '@toy-box/meta-schema'

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
  loadMetaData: (objectKey: string, id: string) => Promise<IMetaObjectResult>
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

export type SchemaType = 'schema' | 'repository'

export type SchemaOption = {
  type: SchemaType
  schema?: IFieldMeta
  repository?: string
}
