import { LinkAction, PageAction, AutoflowAction } from '../../types'

export interface IActionContext {
  linkHandle: (linkAction: LinkAction) => void
  pageHandle: (pageAction: PageAction) => void
  autoflowHandle: (autoflowAction: AutoflowAction) => Promise<any>
  saveHandle: (refObjectKey: string, data: any) => Promise<any>
}
