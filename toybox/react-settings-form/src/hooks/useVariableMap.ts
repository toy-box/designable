import { useMemo } from 'react'
import { usePageParameters } from './usePage'
import { useRecord } from './useRecord'

export const useVariableMap = () => {
  const parameters = usePageParameters()
  const $Record = useRecord()
  const $PageParams = useMemo(() => {
    const params = {
      key: '$PageParams',
      name: '$PageParams',
      type: 'object',
      properties: {},
    }
    parameters.forEach((param) => {
      params.properties[param.key] = param
    })
    return params
  }, [parameters])

  return {
    $PageParams,
    $Record,
  }
}
