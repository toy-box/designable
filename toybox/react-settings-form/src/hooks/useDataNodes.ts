import React from 'react'
import { TreeNode } from '@designable/core'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useNode } from './useNode'
import { useRoot } from './useRoot'
import { useDataGrid } from './useDataGrid'
import { useDataView } from './useDataView'

const fetchDataNodes = (
  node: TreeNode,
  xComponents: string | string[]
): TreeNode[] => {
  const names = Array.isArray(xComponents) ? xComponents : [xComponents]
  return (node.children || []).reduce<TreeNode[]>((nodes, child) => {
    if (names.includes(child.props['x-component'])) {
      return [...nodes, node]
    } else {
      return [...nodes, ...fetchDataNodes(child, names)]
    }
  }, [])
}

const makeDataGridSelectedRowsMeta = (recordMeta: IFieldMeta): IFieldMeta => {
  return {
    key: '$SelectedRows',
    type: 'array',
    name: '$SelectedRows',
    items: {
      type: 'object',
      properties: recordMeta.properties,
    },
  }
}

const makeDataGridSelectedKeysMeta = (): IFieldMeta => {
  return {
    key: '$SelectedRowKeys',
    name: '$SelectedRowKeys',
    type: MetaValueType.ARRAY,
    items: {
      type: MetaValueType.STRING,
    },
  }
}

const makeRowMeta = (recordMeta: IFieldMeta): IFieldMeta => {
  return {
    ...recordMeta,
    key: '$Record',
  }
}

export const useDataNodes = () => {
  const meta = useMeta()
  const root = useRoot()
  const node = useNode()
  const { dataGrid } = useDataGrid()
  const { dataView } = useDataView()
  const isMetaTable = node.props['x-component'] === 'MetaTable'

  const [metas, setMetas] = React.useState<IFieldMeta[]>()
  const generateMeta = async (
    dataGrid: TreeNode,
    dataView: TreeNode,
    isMetaTable: boolean
  ) => {
    const nodeMetas = []
    if (dataView) {
      const metaOption =
        dataGrid.props?.metaOption ||
        dataGrid.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        metas.push(metaOption.schema)
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        metas.push(schema)
      }
    }
    if (dataGrid) {
      const metaOption =
        dataGrid.props?.metaOption ||
        dataGrid.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        metas.push(makeDataGridSelectedRowsMeta(metaOption.schema))
        if (isMetaTable) {
          metas.push(makeRowMeta(metaOption.schema))
        }
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        metas.push(makeDataGridSelectedRowsMeta(schema))
        if (isMetaTable) {
          metas.push(makeRowMeta(schema))
        }
      }
      metas.push(makeDataGridSelectedKeysMeta())
    }
    setMetas(metas)
  }
  React.useEffect(() => {
    generateMeta(dataGrid, dataView, isMetaTable)
  }, [dataGrid, dataView, isMetaTable])

  return fetchDataNodes(root, 'DataView')
}
