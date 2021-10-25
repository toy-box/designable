import React from 'react'

export type PageContextProp = {
  title: string
  name: string
  allowRoles?: string[]
  layout?: string
  params?: Record<string, any>
}

export const PageContext = React.createContext<PageContextProp>(null)
