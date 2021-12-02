import { GeneralField } from '@formily/core'
import {
  LinkAction,
  PageAction,
  AutoflowAction,
  MetaRepositoryAction,
} from '../../types'

export interface IActionFieldData {
  field: GeneralField
  index?: number
}

export interface IActionContext {
  handleLinkAction: (linkAction: LinkAction) => void
  handlePageAction: (pageAction: PageAction) => void
  handleAutoflowAction: (autoflowAction: AutoflowAction) => Promise<any>
  handleMetaRepositoryAction: (metaAction: MetaRepositoryAction) => Promise<any>
}

export interface IFieldActionContext {
  handleLinkAction: (LinkAction: LinkAction, fieldData: IActionFieldData) => void
  handlePageAction: (pageAction: PageAction, fieldData: IActionFieldData) => void
  handleAutoflowAction: (
    autoflowAction: AutoflowAction,
    fieldData: IActionFieldData
  ) => Promise<any>
  handleMetaRepositoryAction: (
    metaAction: MetaRepositoryAction,
    fieldData: IActionFieldData
  ) => Promise<any>
}
