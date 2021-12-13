import {
  LinkActionImpl,
  PageActionImpl,
  AutoflowActionImpl,
} from '@toy-box/freepage-components'

export const handleLinkAction = (linkAction: LinkActionImpl) => {
  window.open(linkAction.url, linkAction.target)
}

export const handlePageAction = (pageAction: PageActionImpl) => {
  // console.log('handlePageAction', pageAction)
}

export const handleAutoflowAction = (autoflowAction: AutoflowActionImpl) => {
  // console.log('handleAutoflowAction', autoflowAction)
}
