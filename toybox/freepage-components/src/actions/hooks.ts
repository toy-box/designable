import React from 'react'
import { ActionContext } from '.'

export const useActions = () => {
  return React.useContext(ActionContext)
}
