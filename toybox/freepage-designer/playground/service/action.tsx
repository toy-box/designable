import React from 'react'
import {
  LinkActionImpl,
  PageActionImpl,
  AutoflowActionImpl,
} from '@toy-box/freepage-components'
import { Modal } from '@toy-box/toybox-ui'
import { FreePage } from '../../src'
import {
  loadMetaRepoList,
  loadMetaRepoListByValue,
  loadMetaSchema,
  loadMetaData,
  loadMetaDataList,
  loadMetaDataPageable,
} from './meta'

const { dialog } = Modal

export const handleLinkAction = (linkAction: LinkActionImpl) => {
  window.open(linkAction.url, linkAction.target)
}

export const handlePageAction = (pageAction: PageActionImpl) => {
  dialog({
    title: 'Open Page In Dialog',
    content: ({ close }) => {
      return (
        <FreePage
          pageProps={{
            labelCol: 6,
            wrapperCol: 12,
          }}
          schema={{
            type: 'object',
            properties: {
              s5akie22akv: {
                type: 'string',
                title: 'Input',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [],
                'x-component-props': {},
                'x-decorator-props': {},
                'x-index': 0,
              },
            },
          }}
          meta={{
            loadMetaRepoList,
            loadMetaRepoListByValue,
            loadMetaSchema,
            loadMetaData,
            loadMetaDataList,
            loadMetaDataPageable,
          }}
          action={{
            handleLinkAction,
            handlePageAction,
            handleAutoflowAction,
          }}
        />
      )
    },
  })
}

export const handleAutoflowAction = (autoflowAction: AutoflowActionImpl) => {
  // console.log('handleAutoflowAction', autoflowAction)
}
