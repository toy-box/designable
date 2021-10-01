import React from 'react'
import { ActionContext } from '../context/actions'

export const useActions = () => {
  return React.useContext(ActionContext)
}
