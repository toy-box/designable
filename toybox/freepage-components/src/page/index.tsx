import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'

export type PageProps = {
  title: string
  name: string
  layout: string
} & FormProps

export const Page: React.FC<PageProps> = ({
  title,
  name,
  layout,
  ...formProps
}) => {
  return (
    <PageContext.Provider value={{ title, name, layout }}>
      <Form {...formProps} />
    </PageContext.Provider>
  )
}
