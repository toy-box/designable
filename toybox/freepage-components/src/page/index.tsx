import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'

export type PageProps = {
  title: string
  name: string
  layout: string
  pageParams?: Record<string, any>
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  layout,
  pageParams,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, layout }}>
      <Form {...formProps} />
    </PageContext.Provider>
  )
}
