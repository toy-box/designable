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

export const useNodeDataMeta = () => {
  const meta = useMeta()
  const root = useRoot()
  const node = useNode()
  const { dataGrid } = useDataGrid()
  const { dataView } = useDataView()
  const isMetaTable = node.props['x-component'] === 'MetaTable'

  const [metas, setMetas] = React.useState<IFieldMeta[]>()
  const generateMeta = async (
    root: TreeNode,
    dataGrid: TreeNode,
    dataView: TreeNode,
    isMetaTable: boolean
  ) => {
    const nodeMetas = []
    if (root) {
      const pageParams: IFieldMeta = {
        key: '$PageParams',
        name: '$PageParams',
        type: MetaValueType.OBJECT,
        properties: {},
      }
      const params = root.props?.params || []
      params.forEach((param) => {
        pageParams.properties[param.key] = {
          key: param.key,
          name: param.key,
          type: param.type,
        }
      })
      nodeMetas.push(pageParams)
    }
    if (dataView) {
      const metaOption =
        dataGrid.props?.metaOption ||
        dataGrid.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        nodeMetas.push(metaOption.schema)
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        nodeMetas.push(schema)
      }
    }
    if (dataGrid) {
      const metaOption =
        dataGrid.props?.metaOption ||
        dataGrid.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        nodeMetas.push(makeDataGridSelectedRowsMeta(metaOption.schema))
        if (isMetaTable) {
          nodeMetas.push(makeRowMeta(metaOption.schema))
        }
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        nodeMetas.push(makeDataGridSelectedRowsMeta(schema))
        if (isMetaTable) {
          nodeMetas.push(makeRowMeta(schema))
        }
      }
      nodeMetas.push(makeDataGridSelectedKeysMeta())
    }
    nodeMetas.push()
    setMetas(nodeMetas)
  }
  React.useEffect(() => {
    generateMeta(root, dataGrid, dataView, isMetaTable)
  }, [root, dataGrid, dataView, isMetaTable])

  return metas
}
