import React, { useCallback } from 'react'
import { Checkbox } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useDataGrid } from '../../hooks'

export interface IFieldPickSetterProps {
  value?: any
  onChange?: (value?: string[]) => void
}

export const FieldPickSetter: React.FC<IFieldPickSetterProps> = observer(
  ({ value, onChange }) => {
    const field = useField()
    const { attributes } = useDataGrid()

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
          <Checkbox value={attr.value} key={attr.value}>
            {attr.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    )
  }
)

export const fetchMeta = (path: string[], meta: IFieldMeta) => {
  if (path == null || path.length === 0 || meta == null) {
    return meta
  }
  const currentMeta =
    meta.type === 'object'
      ? meta.properties[path[0]]
      : meta.type === 'array'
      ? meta.items.properties[path[0]]
      : null

  return fetchMeta(path.slice(1), currentMeta)
}
