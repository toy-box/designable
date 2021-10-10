import { useEffect, useMemo, useState } from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useScope } from './useScope'

export const useDataGrid = () => {
  const { node } = useScope()
  const meta = useMeta()
  const [schema, setSchema] = useState<IFieldMeta>()
  const dataGrid = node
    .getParents()
    .find((node) => node.props['x-component'] === 'DataGrid')

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

  return { dataGrid, attributes, schema }
}
