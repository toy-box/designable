import {
  LinkAction,
  PageAction,
  AutoflowAction,
  MetaRepositoryAction,
} from '../../types'

export interface IActionContext {
  haneleLinkAction: (linkAction: LinkAction) => void
  handlePageAction: (pageAction: PageAction) => void
  handleAutoflowAction: (autoflowAction: AutoflowAction) => Promise<any>
  handleMetaRepositoryAction: (metaAction: MetaRepositoryAction) => Promise<any>
}
