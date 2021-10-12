import React, { useCallback } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { useDataView } from '../../hooks'

export interface IFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const FieldBindSetter: React.FC<IFieldBindSetterProps> = observer(
  ({ value, onChange }) => {
    const field = useField()
    const { attributes, dataView } = useDataView()
    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
        field.form.setValuesIn(
          'title',
          attributes.find((attr) => attr.value === value)?.label
        )
        field.form.setValuesIn('name', value)
      },
      [onChange, field, attributes]
    )

    return (
      <Select
        options={attributes}
        disabled={dataView == null}
        value={value}
        onChange={handleChange}
      />
    )
  }
)
