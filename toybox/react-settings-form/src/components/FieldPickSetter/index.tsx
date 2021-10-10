import React, { useCallback } from 'react'
import { Checkbox } from 'antd'
import { observer, useField } from '@formily/react'
import { useScope, useDataGrid } from '../../hooks'

export interface IFieldPickSetterProps {
  value?: any
  onChange?: (value?: string[]) => void
}

export const FieldPickSetter: React.FC<IFieldPickSetterProps> = observer(
  ({ value, onChange }) => {
    const { node } = useScope()
    const field = useField()
    const { attributes } = useDataGrid(node)

    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
      },
      [onChange, field, attributes]
    )

    return (
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={handleChange}
        value={value}
      >
        {attributes.map((attr) => (
          <div key={attr.value}>
            <Checkbox value={attr.value}>{attr.label}</Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    )
  }
)
