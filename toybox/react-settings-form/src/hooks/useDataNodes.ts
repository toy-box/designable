import React from 'react'
import { TreeNode } from '@designable/core'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useNode } from './useNode'
import { useRoot } from './useRoot'

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

const makeDataGridSelectedRowsMeta = (recordMeta: IFieldMeta) => {
  return {
    key: '$SelectedRows',
    type: 'array',
    items: {
      type: 'object',
      properties: recordMeta,
    },
  }
}

const makeDataGridSelectedKeysMeta = (recordMeta: IFieldMeta) => {
  return {
    key: '$SelectedRowKeys',
    type: 'array',
    items: {
      type: 'string',
    },
  }
}

const makeRowMeta = (recordMeta: IFieldMeta) => {
  return {
    key: '$Record',
    type: 'object',
    properties: recordMeta,
  }
}

export const useDataNodes = () => {
  const meta = useMeta()
  const root = useRoot()
  const node = useNode()
  const dataViews = fetchDataNodes(root, 'DataView')
  const dataGrids = fetchDataNodes(root, 'DataGrid')

  const [metas, setMetas] = React.useState<IFieldMeta[]>()
  const fetchMeta = async (nodes: TreeNode[]) => {
    const dataMetas = []
    for (let i = 0; i < nodes.length; i += 1) {
      const theNode = nodes[i]
      const metaOption =
        theNode.props?.metaOption ||
        theNode.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        dataMetas.push({
          name: theNode.props.name,
          schema: metaOption.schema,
        })
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        dataMetas.push({
          name: theNode.props.name,
          schema,
        })
      }
    }
    setMetas(dataMetas)
  }
  React.useEffect(() => {
    fetchMeta(dataViews)
  }, [dataViews])

  return fetchDataNodes(root, 'DataView')
}
