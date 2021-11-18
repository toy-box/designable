import React, { useCallback } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { useDataGrid, useNodeDataMeta } from '../../hooks'

export interface IDataGridFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const DataGridFieldBindSetter: React.FC<IDataGridFieldBindSetterProps> =
  observer(({ value, onChange }) => {
    const field = useField()
    const { dataGrid, attributes } = useDataGrid()
    const nodeDataMeta = useNodeDataMeta()
    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
        field.form.setValuesIn('x-component-props.{title, key}', {
          title: attributes.find((attr) => attr.value === value)?.label,
          key: attributes.find((attr) => attr.value === value)?.value,
        })
      },
      [onChange, field, attributes]
    )

    return (
      <Select
        options={attributes}
        disabled={dataGrid == null}
        value={value}
        onChange={handleChange}
      />
    )
  })
