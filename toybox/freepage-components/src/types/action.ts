import { Field } from '@formily/core'
import { MetaValueType } from '@toy-box/meta-schema'

export enum ActionType {
  Nothing = '',
  Page = 'page',
  Link = 'link',
  Autoflow = 'autoflow',
  MetaRepository = 'metaRepository',
}

export enum LinkTarget {
  Blank = '_blank',
  Self = '_self',
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

export type ParamValueType = MetaValueType

export type ParamBind = {
  key?: string
  expression?: string
}

export interface PageAction {
  pageId: string
  params: ParamBind[]
}

export interface LinkAction {
  url: string
  target: LinkTarget
}

export interface AutoflowAction {
  autoflowId: string
}

export interface MetaRepositoryAction {
  operation: MetaRepositoryOP
}

export type MetaRepositoryOP = 'save' | 'delete'
