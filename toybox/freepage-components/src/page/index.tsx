import React from 'react'
import { Form, FormProps } from '@formily/antd'
import { PageContext } from './context'
import { useStateParams } from './hooks/useStateParams'
import { useQueryParams } from './hooks/useQueryParams'
import { formulaResultType } from '@toy-box/formula'

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
  const queryParams = useQueryParams()
  const stateParams = useStateParams()
  const params = React.useMemo(
    () => pageParams || stateParams || queryParams,
    [queryParams, stateParams]
  )
  const { form } = formProps
  React.useEffect(() => {
    form.setValuesIn('$PageParams', params)
  }, [params])

  return (
    <PageContext.Provider value={{ title, name, layout }}>
      <Form {...formProps} />
    </PageContext.Provider>
  )
}
