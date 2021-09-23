import { useContext } from 'react'
import { SchemaExpressionScopeContext } from '@formily/react'

export const useScope = () => {
  return useContext(SchemaExpressionScopeContext)
}
