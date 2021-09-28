import React from 'react'
import { PageContext, IMetaContext } from './context'

export type PageProps = {
  title: string
  name: string
  layout: string
} & IMetaContext

export const Page: React.FC<PageProps> = ({
  title,
  name,
  layout,
  loadData,
  loadMeta,
}) => {
  const renderLayout = () => {
    return <div></div>
  }
  return (
    <PageContext.Provider value={{ title, name, layout, loadData, loadMeta }}>
      {renderLayout}
    </PageContext.Provider>
  )
}
