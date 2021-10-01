import React from 'react'
import { MetaContext } from '../context/meta'

export const useMeta = () => {
  return React.useContext(MetaContext)
}
