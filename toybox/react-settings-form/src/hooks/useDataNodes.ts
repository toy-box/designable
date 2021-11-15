import React from 'react'
import { TreeNode } from '@designable/core'
import { IFieldMeta } from '@toy-box/meta-schema'
import { useMeta } from '@toy-box/freepage-components'
import { useNode } from './useNode'
import { useRoot } from './useRoot'

const fetchDataNodes = (node: TreeNode, xComponent: string): TreeNode[] => {
  return (node.children || []).reduce<TreeNode[]>((nodes, child) => {
    if (child.props['x-component'] === xComponent) {
      return [...nodes, node]
    } else {
      return [...nodes, ...fetchDataNodes(child, xComponent)]
    }
  }, [])
}

export const useDataNodes = () => {
  const meta = useMeta()

  const node = useNode()
  const root = useRoot()
  const dataNodes = fetchDataNodes(root, 'DataView')
  const [schemas, setSchemas] = React.useState<IFieldMeta[]>()
  const fetchSchema = async (nodes: TreeNode[]) => {
    const dataSchemas = []
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i]
      const metaOption =
        node.props?.metaOption || node.props?.['x-component-props']?.metaOption
      if (metaOption.type === 'schema') {
        dataSchemas.push({
          name: node.props.name,
          schema: metaOption.schema,
        })
      } else if (metaOption?.type === 'repository' && metaOption?.repository) {
        const schema = await meta.loadMetaSchema(metaOption.repository)
        dataSchemas.push({
          name: node.props.name,
          schema,
        })
      }
    }
    setSchemas(dataSchemas)
  }
  React.useEffect(() => {
    fetchSchema(dataNodes)
  }, [dataNodes])

  return fetchDataNodes(root, 'DataView')
}
