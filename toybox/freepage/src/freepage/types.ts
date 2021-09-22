import { ILogicFilter } from '@toy-box/meta-schema'

export interface IDataViewSchema {
  title: string
  name: string
  type: string
  field: string
  properties: {
    [key: string]: IDataViewSchema
  }
  visibility: ItemVisibility
  editability: ItemEditability
  ['x-component']?: string
  ['x-decorator']?: string
  ['x-component-props']?: any
  ['x-decorator-props']?: any
}

export type ItemVisibleType = 'formula' | 'conditional'

export type ItemVisibility = {
  type: ItemVisibleType
  formula?: string
  conditional?: ILogicFilter
}

export type ItemEditabilityType = 'formula' | 'conditional'

export type ItemEditability = {
  type: ItemEditabilityType
  formula?: string
  conditional?: ILogicFilter
}
