import { useDataGrid } from './useDataGrid'
import { useDataView } from './useDataView'

export const useAttributes = () => {
  const { attributes: dataViewAttributes } = useDataView()
  const { attributes: dataGridAttributes } = useDataGrid()

  return dataViewAttributes || dataGridAttributes
}
