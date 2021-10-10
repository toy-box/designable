import { useEffect, useMemo, useState } from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useScope } from './useScope'
import { TreeNode } from '@designable/core/src'

export const useDataGrid = (dataGridNode?: TreeNode) => {
  const { node } = useScope()
  const meta = useMeta()
  const [schema, setSchema] = useState<IFieldMeta>()
  const dataGrid =
    dataGridNode ||
    node.getParents().find((node) => node.props['x-component'] === 'DataGrid')

  useEffect(() => {
    if (dataGrid == null) {
      setSchema(null)
    }
    if (dataGrid.props?.dataSource?.repository == null) {
      setSchema(null)
    } else {
      meta
        .loadMetaSchema(dataGrid.props.dataSource.repository)
        .then((objectMeta) => {
          setSchema(objectMeta)
        })
    }
  }, [dataGrid, dataGrid?.props?.dataSource?.repository, meta])

  const attributes = useMemo(() => {
    if (schema == null) {
      return []
    }
    return Object.keys(schema.properties || {})
      .map((key) => schema.properties[key])
      .map((field) => ({
        value: field.key,
        label: field.name,
      }))
  }, [schema])

  return { dataGrid, attributes, schema }
}
