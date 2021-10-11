export enum ActionType {
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

export interface IAction {
  type: ActionType
  confirm?: Confirm
  pageAction?: PageAction
  linkAction?: LinkAction
  autoflowAction?: AutoflowAction
  metaRepositoryAction?: MetaRepositoryAction
}

export type MetaParams = {
  metaObject?: any
  primaryValue?: string
}

export interface PageAction {
  pageId: string
  metaParams?: MetaParams
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
  type: MetaRepositoryType
}

export type MetaRepositoryType = 'save' | 'delete'

export interface IActionContext {
  linkHandle: (linkAction: LinkAction) => void
  pageHandle: (pageAction: PageAction) => void
  autoflowHandle: (autoflowAction: AutoflowAction) => Promise<any>
  saveHandle: (refObjectKey: string, data: any) => Promise<any>
}
