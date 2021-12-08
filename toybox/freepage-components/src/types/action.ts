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

export type ParamVaule = {
  key: string
  value: any
}

export type ParamBind = {
  key?: string
  expression?: string
}

export type PageAction = {
  pageId: string
  parameters?: ParamBind[]
}

export type LinkAction = {
  url: string
  target: LinkTarget
}

export type AutoflowAction = {
  autoflowId: string
  parameters?: ParamBind[]
}

export type MetaRepositoryAction = {
  operation: MetaRepositoryOP
}

export type PageActionImpl = {
  pageId: string
  parameters?: ParamVaule[]
}

export type LinkActionImpl = LinkAction

export type AutoflowActionImpl = {
  autoflowId: string
  parameters?: ParamVaule[]
}

export type MetaRepositoryOP = 'save' | 'delete'
