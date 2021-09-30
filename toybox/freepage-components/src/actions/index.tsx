import React from 'react'
import { IActionContext } from './types'

export * from './hooks'

export const ActionContext = React.createContext<IActionContext>(null)
