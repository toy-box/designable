import { useNode } from './useNode'

export const useRoot = () => {
  const node = useNode()
  return node.getParentByDepth(0)
}
