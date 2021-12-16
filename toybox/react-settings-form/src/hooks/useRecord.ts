import { useNode } from './useNode'
import { useDataGrid } from './useDataGrid'
import { useDataView } from './useDataView'

export const useRecord = () => {
  const node = useNode()
  const { dataGrid, schema: dataGridSchema } = useDataGrid()
  const { dataView, schema: dataViewSchema } = useDataView()
  if (node.props['x-component'] === 'MetaTable' && dataGridSchema) {
    return dataGridSchema?.properties?.rows?.items
  } else if (node.props['x-component'] === 'DataView' && dataViewSchema) {
    return dataViewSchema
  }
  return undefined
}
