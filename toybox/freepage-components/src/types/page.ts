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

export interface Page {
  id: string
  name: string
  params: PageParameter[]
}
export interface IPageOption {
  loadPageList: (name?: string) => Promise<Page[]>
  loadPage: (pageId: string) => Promise<Page>
  loadPageByValue: (ids: string[]) => Promise<Page[]>
}
