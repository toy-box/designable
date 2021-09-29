import { AutoflowAction, LinkAction, PageAction } from './types'

export interface ActionProvider {
  linkHandle: (linkAction: LinkAction) => void
  pageHandle: (pageAction: PageAction) => void
  autoflowHandle: (autoflowAction: AutoflowAction) => Promise<any>
  saveHandle: (refObjectKey: string, data: any) => Promise<any>
}
