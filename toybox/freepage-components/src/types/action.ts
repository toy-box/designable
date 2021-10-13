import { PageParameter } from './page'

export enum ActionType {
  Nothing = '',
  Page = 'page',
  Link = 'link',
  Autoflow = 'autoflow',
  MetaRepository = 'metaRepository',
}

export interface Confirm {
  title: string
  message: string
  submit: string
  cancel: string
  danger?: boolean
}

export interface Action {
  type: ActionType
  confirm?: Confirm
  pageAction?: PageAction
  linkAction?: LinkAction
  autoflowAction?: AutoflowAction
  metaRepositoryAction?: MetaRepositoryAction
}

export enum ParameterValuePattern {
  Value = 'value',
  DataView = 'dataView',
}

export interface ParameterValue {
  paramKey: string
  valuePattern: string
  target: string
}

export interface PageAction {
  page: string
  params: ParameterValue[]
}

export type LinkType = '_blank' | '_self'

export interface LinkAction {
  url: string
  target: LinkType
}

export interface AutoflowAction {
  autoflowId: string
}

export interface MetaRepositoryAction {
  operation: MetaRepositoryOP
}

export type MetaRepositoryOP = 'save' | 'delete'
