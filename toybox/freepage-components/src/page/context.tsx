import React from 'react'

export type PageContextProp = {
  title: string
  name: string
  allowRoles?: string[]
  layout?: string
  parameters?: Record<string, any>
  states?: Record<string, any>
}

export const PageContext = React.createContext<PageContextProp>(null)
