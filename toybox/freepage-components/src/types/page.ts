import { IFieldMeta } from '@toy-box/meta-schema'

export enum PageParameterPattern {
  BaseType = 'baseType',
  MetaSchema = 'MetaSchema',
  MetaObject = 'MetaObject',
}

export interface IBaseParameter {
  key: string
  type: string
  name?: string
}

export type PageParameter = IBaseParameter

export interface IPage {
  id: string
  name: string
  parameters: PageParameter[]
}

export interface IPageOption {
  loadPageList: (name?: string) => Promise<IPage[]>
  loadPage: (pageId: string) => Promise<IPage>
  loadPageByValue: (ids: string[]) => Promise<IPage[]>
  loadPageParameters: (pageId: string) => Promise<PageParameter[]>
}
