import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useScope } from '../../hooks'

export interface IDataGridFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const DataGridFieldBindSetter: React.FC<IDataGridFieldBindSetterProps> =
  observer(({ value, onChange }) => {
    const field = useField()
    const { node } = useScope()
    const meta = useMeta()
    const [schema, setSchema] = useState<IFieldMeta>()
    const dataGrid = useMemo(
      () =>
        node
          .getParents()
          .find((node) => node.props['x-component'] === 'DataGrid'),
      [node]
    )

    useEffect(() => {
      if (dataGrid == null) {
        setSchema(null)
      } else {
        if (dataGrid.props?.dataSource?.repository) {
          meta
            .loadMetaSchema(dataGrid.props.dataSource.repository)
            .then((objectMeta) => {
              setSchema(objectMeta)
            })
        }
      }
    }, [dataGrid, meta])

    const attributes = useMemo(() => {
      if (dataGrid == null || schema == null) {
        return []
      }
      return Object.keys(schema.properties || {})
        .map((key) => schema.properties[key])
        .map((field) => ({
          value: field.key,
          label: field.name,
        }))
    }, [dataGrid, schema])

    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
        field.form.setValuesIn(
          'x-component-props.title',
          attributes.find((attr) => attr.value === value)?.label
        )
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
