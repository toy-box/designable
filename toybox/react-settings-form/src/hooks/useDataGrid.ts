import { useEffect, useMemo, useState } from 'react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { TreeNode } from '@designable/core/src'
import { useNode } from './useNode'

export const useDataGrid = (dataGridNode?: TreeNode) => {
  const node = useNode()
  const meta = useMeta()
  const [schema, setSchema] = useState<IFieldMeta>()
  const dataGrid =
    dataGridNode ||
    node.getParents().find((node) => node.props['x-component'] === 'DataGrid')

  const metaOption = useMemo(
    () =>
      dataGrid?.props?.metaOption ||
      dataGrid?.props?.['x-component-props']?.metaOption,
    [dataGrid]
  )

  useEffect(() => {
    if (dataGrid == null) {
      setSchema(null)
    }
    if (metaOption?.type == 'schema') {
      setSchema(metaOption.schema)
    } else if (metaOption?.type == 'entity') {
      meta.loadMetaSchema(metaOption.entityId).then((objectMeta) => {
        setSchema(objectMeta)
      })
    } else {
      setSchema(undefined)
    }
  }, [dataGrid, metaOption, meta])

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
