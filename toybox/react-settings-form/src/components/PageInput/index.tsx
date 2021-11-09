import React from 'react'
import { Select } from '@toy-box/toybox-ui'
import { useMeta } from '@toy-box/freepage-components'

export const PageInput = (props) => {
  const { loadPageList, loadPageByValue } = useMeta()
  return (
    <Select {...props} remote={loadPageList} remoteByValue={loadPageByValue} />
  )
}
