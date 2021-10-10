import { useEffect, useState, useMemo } from 'react'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useScope } from './useScope'

export const useDataView = () => {
  const { node } = useScope()
  const meta = useMeta()
  const [schema, setSchema] = useState<IFieldMeta>()
  const dataView = node
    .getParents()
    .find((node) => node.props['x-component'] === 'DataView')

  const dataParent = useMemo(
    () =>
      node
        .getParents()
        .find(
          (node) => node.props.type === 'array' || node.props.type === 'object'
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
        .filter((field) => fitField(field, node))
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
    const meta = fetchMeta(path, schema) || {}
    return Object.keys(meta.properties || {})
      .map((key) => meta.properties[key])
      .filter((field) => fitField(field, node))
      .map((field) => ({
        value: field.key,
        label: field.name,
      }))
  }, [dataView, dataParent, schema])

  return { dataView, attributes, schema }
}

const fetchMeta = (path: string[], meta: IFieldMeta) => {
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
