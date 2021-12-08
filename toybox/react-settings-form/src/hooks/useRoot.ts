import { TreeNode } from '@designable/core'
import { useNode } from './useNode'

export const useRoot = (): TreeNode => {
  const node = useNode()
  return node.depth === 0 ? node : node.getParentByDepth(0)
}
