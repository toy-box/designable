import React from 'react'
import { PageContext } from './context'

export type PageProps = {
  title: string
  name: string
  layout: string
}

export const Page: React.FC<PageProps> = ({ title, name, layout }) => {
  const renderLayout = () => {
    return <div></div>
  }
  return (
    <PageContext.Provider value={{ title, name, layout }}>
      {renderLayout}
    </PageContext.Provider>
  )
}
