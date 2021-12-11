import React from 'react'
import { useStateParams, useQueryParams, usePageParameters } from './hooks'

export type PageParamsProps = {
  onChange: (value: Record<string, any>) => void
  value: Record<string, any>
}

export const PageParams: React.FC<PageParamsProps> = ({ onChange, value }) => {
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
    onChange(Object.assign(value, params))
  }, [params])

  return <React.Fragment />
}
