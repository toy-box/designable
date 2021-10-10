import React, { useCallback } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
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

const fitField = (field: IFieldMeta, node) => {
  if (node.props.type === 'object') {
    return field.type === MetaValueType.OBJECT
  }
  return (ComponentFit[node.props['x-component']] || []).some(
    (type) => type === field.type
  )
}

const ComponentFit: Record<string, MetaValueType[]> = {
  Input: [MetaValueType.STRING],
  TextArea: [MetaValueType.STRING, MetaValueType.TEXT],
  NumberPicker: [MetaValueType.INTEGER, MetaValueType.NUMBER],
  Percent: [MetaValueType.PERCENT],
  Switch: [MetaValueType.BOOLEAN],
  Select: [MetaValueType.SINGLE_OPTION],
  ObjectContainer: [MetaValueType.OBJECT],
  DatePicker: [MetaValueType.DATE, MetaValueType.DATETIME],
}
