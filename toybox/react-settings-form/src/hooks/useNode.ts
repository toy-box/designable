import { TreeNode } from '@designable/core'
import { useScope } from './useScope'

export const useNode = () => {
  const scope: { node: TreeNode } = useScope()
  return scope.node
}
