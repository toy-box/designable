import React from 'react'
import { IActionContext } from './types'

export * from './types'
export const ActionContext = React.createContext<IActionContext>(null)
