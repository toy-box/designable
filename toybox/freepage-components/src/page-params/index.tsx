import { useField } from '@formily/react'
import React from 'react'
import { useStateParams, useQueryParams, usePageParameters } from './hooks'

export const PageParams: React.FC = () => {
  const field = useField()
  const pageParameters = usePageParameters()
  const queryParams = useQueryParams()
  const stateParams = useStateParams()
  const pageParams = React.useMemo(
    () => stateParams || queryParams,
    [stateParams, queryParams]
  )
  const params = React.useMemo(() => {
    const data = {}
    pageParameters.forEach((param) => {
      data[param.key] = pageParams[param.key]
    })
    return data
  }, [pageParams])

  React.useEffect(() => {
    field.form.setValuesIn('$PageParams', params)
  }, [params, field])

  return <React.Fragment />
}
