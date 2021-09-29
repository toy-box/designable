export enum ActionType {
  Page = 'page',
  Link = 'link',
  Autoflow = 'autoflow',
  Save = 'save',
}

export interface IAction {
  type: ActionType
}

export type MetaParams = {
  metaObject?: any
  primaryId?: string
}

export type PageAction = {
  pageId: string
  metaParams?: MetaParams
}

export type LinkType = '_blank' | '_self'

export type LinkAction = {
  url: string
  target: LinkType
}

export type AutoflowAction = {
  autoflowId: string
}
