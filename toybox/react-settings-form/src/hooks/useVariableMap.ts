import { useMemo } from 'react'
import { IFieldMeta, IFieldItems } from '@toy-box/meta-schema'
import { useDataGrid } from './useDataGrid'
import { usePageParameters } from './usePage'
import { useRecord } from './useRecord'

export const useVariableMap = () => {
  const parameters = usePageParameters()
  const $Record = useRecord()
  const { dataGrid, schema: $DataGrid } = useDataGrid()
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
  const variableMap = useMemo(() => {
    const innerMap: Record<string, IFieldMeta | IFieldItems<IFieldMeta>> = {}
    if ($PageParams) {
      innerMap['$PageParams'] = $PageParams
    }
    if ($Record) {
      innerMap['$Record'] = $Record
    }
    if ($DataGrid) {
      innerMap['$DataGrid'] = $DataGrid
    }
    return innerMap
  }, [$PageParams, $Record, $DataGrid])
  return { variableMap }
}
