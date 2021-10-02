import React from 'react'
import { Select } from '@toy-box/toybox-ui'
import { useMeta } from '@toy-box/freepage-components'

export const RepositoryInput = (props) => {
  const { loadMetaRepoList, loadMetaRepoListByValue } = useMeta()
  return (
    <Select
      {...props}
      remote={loadMetaRepoList}
      remoteByValue={loadMetaRepoListByValue}
    />
  )
}
