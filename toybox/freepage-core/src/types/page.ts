import { MetaValueType, ILogicFilter } from '@toy-box/meta-schema'

export enum PageParameterPattern {
  BaseType = 'baseType',
  MetaSchema = 'MetaSchema',
  MetaObject = 'MetaObject',
}

export interface IBaseParameter {
  key: string
  type: MetaValueType
  name?: string
}

export type PageParameter = IBaseParameter

export interface IPageBase {
  id: string
  name: string
  title: string
  parameters: PageParameter[]
  states: IBaseParameter[]
}

export interface IPageOption {
  loadPageList: (name?: string) => Promise<IPageBase[]>
  loadPage: (pageId: string) => Promise<IPageBase>
  loadPageByValue: (ids: string[]) => Promise<IPageBase[]>
  loadPageParameters: (pageId: string) => Promise<PageParameter[]>
}

export type ItemVisibleType = 'expression' | 'conditional'

export type ItemVisibility = {
  type: ItemVisibleType
  expression?: string
  conditional?: ILogicFilter
}

export type ItemEditabilityType = 'expression' | 'conditional'

export type ItemEditability = {
  type: ItemEditabilityType
  expression?: string
  conditional?: ILogicFilter
}
