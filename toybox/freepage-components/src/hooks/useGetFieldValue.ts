import { GeneralField } from '@formily/core'
import { useField } from '@formily/react'
import { isNum } from '@formily/shared'

const DATA_GRID = 'DataGrid'

export const useGetFieldValue = (field: GeneralField, index?: number) => {
  const basePath = field.path
  if (field.component[0] === DATA_GRID && isNum(index)) {
    return {
      $Record: field.data.rows[index],
      $SelectedRows: field.data.selectedRows,
      $SelectedRowKeys: field.data.selectedRowKeys,
      ...field.form.values,
    }
  }
  return field.form.values
}
