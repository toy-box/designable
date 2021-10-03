export enum ActionType {
  Page = 'page',
  Link = 'link',
  Autoflow = 'autoflow',
  Others = 'others',
}

export interface IAction {
  type: ActionType
}

export type MetaParams = {
  metaObject?: any
  primaryValue?: string
}

export interface PageAction extends IAction {
  pageId: string
  metaParams?: MetaParams
}

export type LinkType = '_blank' | '_self'

export interface LinkAction extends IAction {
  url: string
  target: LinkType
}

export interface AutoflowAction extends IAction {
  autoflowId: string
}

export interface IActionContext {
  linkHandle: (linkAction: LinkAction) => void
  pageHandle: (pageAction: PageAction) => void
  autoflowHandle: (autoflowAction: AutoflowAction) => Promise<any>
  saveHandle: (refObjectKey: string, data: any) => Promise<any>
}
