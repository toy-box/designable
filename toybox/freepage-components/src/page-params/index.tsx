import React from 'react'
import { useStateParams, useQueryParams } from './hooks'
import { PageParameter } from '../types'

export type PageParamsProps = {
  pageParameters: PageParameter[]
  onChange: (value: Record<string, any>) => void
}

export const PageParams: React.FC<PageParamsProps> = ({
  pageParameters,
  onChange,
}) => {
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
  }, [queryParams, stateParams])
  React.useEffect(() => {
    onChange(params)
  }, [params])

  return <React.Fragment />
}
