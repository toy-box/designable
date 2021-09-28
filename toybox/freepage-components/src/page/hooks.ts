import React from 'react'
import { PageContext } from './context'

export const usePage = () => {
  return React.useContext(PageContext)
}

export const usePageParams = () => {
  return usePage().params
}
