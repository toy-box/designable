import React from 'react'
import { MetaContextProps } from './types'

export * from './types'
export const MetaContext = React.createContext<MetaContextProps>(null)
