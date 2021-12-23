import React from 'react'
import {
  LinkActionImpl,
  PageActionImpl,
  AutoflowActionImpl,
} from '@toy-box/freepage-components'
import { Modal, Button } from '@toy-box/toybox-ui'
const { dialog } = Modal

export const handleLinkAction = (linkAction: LinkActionImpl) => {
  window.open(linkAction.url, linkAction.target)
}

export const handlePageAction = (pageAction: PageActionImpl) => {
  dialog({
    title: 'Open Page In Dialog',
    content: ({ close }) => {
      return (
        <div>
          <Button onClick={close}>Close</Button>
        </div>
      )
    },
  })
}

export const handleAutoflowAction = (autoflowAction: AutoflowActionImpl) => {
  // console.log('handleAutoflowAction', autoflowAction)
}
