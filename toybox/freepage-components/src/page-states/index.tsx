import { useField } from '@formily/react'
import React from 'react'
import { usePageStates } from './hooks'

export const PageStates: React.FC = () => {
  const field = useField()
  const pageStates = usePageStates()

  React.useEffect(() => {
    field.form.setValuesIn('$PageStates', pageStates)
  }, [pageStates, field])

  return <React.Fragment />
}
