import React from 'react'
import { DataViewContext } from '../data-view'

export const useDataView = () => {
  return React.useContext(DataViewContext)
}
