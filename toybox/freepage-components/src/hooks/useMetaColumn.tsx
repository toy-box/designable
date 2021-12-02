import React from 'react'
import { MetaColumnContext } from '@toy-box/meta-components'

export const useMetaColumn = () => {
  return React.useContext(MetaColumnContext)
}