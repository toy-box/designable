import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'
import { PageParameter } from '../types'

export type PageProps = {
  title: string
  name: string
  layout: string
  parameters?: PageParameter[]
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  layout,
  parameters,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, layout, parameters }}>
      <Form {...formProps} />
    </PageContext.Provider>
  )
}
