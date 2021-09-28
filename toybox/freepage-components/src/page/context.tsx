import { IObjectMeta } from '@toy-box/meta-schema'
import React from 'react'

export type MetaParams = {
  metaObject?: any
  primaryId?: string
}

export type PageParams = {
  metaParams: MetaParams
}

export type PageContextProp = {
  title: string
  name: string
  allowRoles?: string[]
  layout?: string
  params?: PageParams
} & IMetaContext

export interface IMetaContext {
  loadMeta: (id: string) => Promise<IObjectMeta>
  loadData: (metaKey: string, id: string) => Promise<any>
}

export const PageContext = React.createContext<PageContextProp>(null)
