import { IObjectMeta } from '@toy-box/meta-schema'
import React from 'react'
import { MetaParams } from '../context/actions/types'

export type PageParams = {
  metaParams: MetaParams
}

export type PageContextProp = {
  title: string
  name: string
  allowRoles?: string[]
  layout?: string
  params?: PageParams
}

export const PageContext = React.createContext<PageContextProp>(null)
