import React from 'react'
import { PageContext } from '../page/context'

export const usePage = () => {
  return React.useContext(PageContext)
}
