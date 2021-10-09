import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useScope } from '../../hooks'

export interface IFieldPickSetterProps {
  value?: any
  onChange?: (value?: string[]) => void
}

export const FieldPickSetter: React.FC<IFieldPickSetterProps> = observer(
  ({ value, onChange }) => {
    const field = useField()
    const { node } = useScope()
    const meta = useMeta()
    const [schema, setSchema] = useState<IFieldMeta>()
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

    useEffect(() => {
      if (dataView == null) {
        setSchema(null)
      } else {
        if (dataView.props?.dataSource?.type === 'raw') {
          setSchema(dataView.props.dataSource.schema)
        }
        if (
          dataView.props?.dataSource?.type === 'repository' &&
          dataView.props?.dataSource.repository
        ) {
          meta
            .loadMetaSchema(dataView.props.dataSource.repository)
            .then((objectMeta) => {
              setSchema(objectMeta)
            })
        }
      }
    }, [dataView, meta])

    const attributes = useMemo(() => {
      if (dataView == null || schema == null) {
        return []
      }
      if (dataParent == null || dataParent === dataView) {
        return Object.keys(schema.properties || {})
          .map((key) => schema.properties[key])
          .map((field) => ({
            value: field.key,
            label: field.name,
          }))
      }
      const path = node
        .getParents()
        .filter(
          (node) => node.depth > dataView.depth && node.props.type !== 'void'
        )
        .map((node) => node.props.name)
      const meta: IFieldMeta = fetchMeta(path, schema) || {}
      return Object.keys(meta.properties || {})
        .filter((key) => meta.parentKey !== key)
        .map((key) => meta.properties[key])
        .map((field) => ({
          value: field.key,
          label: field.name,
        }))
    }, [dataView, dataParent, schema])

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
