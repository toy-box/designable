import { useEffect, useMemo, useState } from 'react'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { TreeNode } from '@designable/core'
import { useNode } from './useNode'

const makeDataGridSchema = (dataSchema: IFieldMeta): IFieldMeta => {
  return {
    key: '$DataGrid',
    name: '$DataGrid',
    type: MetaValueType.OBJECT,
    properties: {
      selectedRows: {
        key: 'selectedRows',
        type: MetaValueType.ARRAY,
        name: 'selectedRows',
        items: dataSchema,
      },
      selectedRowKeys: {
        key: 'selectedRowKeys',
        type: MetaValueType.ARRAY,
        name: 'selectedRowKeys',
        items: {
          type: MetaValueType.STRING,
        },
      },
      rows: {
        key: 'rows',
        name: 'rows',
        type: MetaValueType.ARRAY,
        items: dataSchema,
      },
    },
  }
}

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
      setSchema(makeDataGridSchema(metaOption.schema))
    } else if (metaOption?.type == 'repository') {
      meta.loadMetaSchema(metaOption.repository).then((objectMeta) => {
        setSchema(makeDataGridSchema(objectMeta))
      })
    } else {
      setSchema(undefined)
    }
  }, [dataGrid, metaOption, meta])

  const attributes = useMemo(() => {
    if (schema == null) {
      return []
    }
    const dataProperties = schema?.properties?.rows?.items?.properties || {}
    return Object.keys(dataProperties)
      .map((key) => dataProperties[key])
      .map((field) => ({
        value: field.key,
        label: field.name,
      }))
  }, [schema])

  return { dataGrid, attributes, schema }
}
