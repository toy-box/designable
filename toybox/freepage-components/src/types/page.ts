import { IFieldMeta } from '@toy-box/meta-schema'

export enum PageParameterPattern {
  BaseType = 'baseType',
  MetaSchema = 'MetaSchema',
  MetaObject = 'MetaObject',
}

export interface PageParameter {
  paramKey: string
  name?: string
  pattern: PageParameterPattern
  baseType?: string
  metaSchema?: IFieldMeta
  metaObject?: string
}

export interface IPage {
  id: string
  name: string
  params: PageParameter[]
}
export interface IPageOption {
  loadPageList: (name?: string) => Promise<IPage[]>
  loadPage: (pageId: string) => Promise<IPage>
  loadPageByValue: (ids: string[]) => Promise<IPage[]>
}
