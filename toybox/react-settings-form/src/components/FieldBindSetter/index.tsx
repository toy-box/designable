import React, { useCallback, useMemo, useState } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { usePrefix } from '@designable/react'
import { useScope } from '../../hooks'

export interface IFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const FieldBindSetter: React.FC<IFieldBindSetterProps> = observer(
  ({ value, onChange }) => {
    const field = useField()
    const [metaSchema, setMetaSchema] = useState({
      type: 'object',
      key: 'user',
      properties: {
        name: {
          key: 'name',
          name: '姓名',
          type: 'string',
        },
        email: {
          key: 'email',
          name: '邮件',
          type: 'string',
        },
        birthday: {
          key: 'birthday',
          name: '出生日期',
          type: 'date',
        },
      },
    })
    const { node } = useScope()
    const dataView = useMemo(
      () =>
        node
          .getParents()
          .find((node) => node.props['x-component'] === 'DataView'),
      [node]
    )
    const dataParent = useMemo(
      () =>
        node
          .getParents()
          .find(
            (node) =>
              node.props.type === 'array' || node.props.type === 'object'
          ),
      []
    )
    const attributes = useMemo(() => {
      if (dataView == null) {
        return []
      }
      if (dataParent == null || dataParent === dataView) {
        return Object.keys(metaSchema.properties)
          .map((key) => metaSchema.properties[key])
          .map((field) => ({
            value: field.key,
            label: field.name,
          }))
      }
      return []
    }, [dataView, dataParent, metaSchema])

    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
        field.form.setValuesIn(
          'title',
          attributes.find((attr) => attr.value === value)?.label
        )
        field.form.setValuesIn('name', value)
      },
      [onChange, field]
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
