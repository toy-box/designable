import { IFieldMeta } from '@toy-box/meta-schema'
import { usePageParameters } from '../../../hooks'

export const useVariableMap = () => {
  const parameters = usePageParameters()
  const $PageParams: IFieldMeta = {
    key: '$PageParams',
    name: '$PageParams',
    type: 'object',
    properties: {},
  }
  parameters.forEach((param) => {
    $PageParams.properties[param.key] = param
  })
  return {
    $PageParams,
  }
}
