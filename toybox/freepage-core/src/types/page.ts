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
  title: string
  parameters: PageParameter[]
  states: IBaseParameter[]
}

export interface IPage extends IPageBase {
  id: string
  name: string
}

export interface IPageOption {
  loadPageList: (name?: string) => Promise<IPage[]>
  loadPage: (pageId: string) => Promise<IPage>
  loadPageByValue: (ids: string[]) => Promise<IPage[]>
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
