import { Field } from '@formily/core'
import {
  LinkAction,
  PageAction,
  AutoflowAction,
  MetaRepositoryAction,
} from '../../types'

export interface IActionContext {
  handleLinkAction: (linkAction: LinkAction) => void
  handlePageAction: (pageAction: PageAction) => void
  handleAutoflowAction: (autoflowAction: AutoflowAction) => Promise<any>
  handleMetaRepositoryAction: (metaAction: MetaRepositoryAction) => Promise<any>
}

export interface IFieldActionContext {
  handleLinkAction: (LinkAction: LinkAction, field: Field) => void
  handlePageAction: (pageAction: PageAction, field: Field) => void
  handleAutoflowAction: (
    autoflowAction: AutoflowAction,
    field: Field
  ) => Promise<any>
  handleMetaRepositoryAction: (
    metaAction: MetaRepositoryAction,
    field: Field
  ) => Promise<any>
}
