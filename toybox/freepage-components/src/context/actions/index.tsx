import React from 'react'
import { IActionContextProps } from './types'

export * from './types'
export const ActionContext = React.createContext<IActionContextProps>(null)
