import React from 'react'
import { Select } from 'antd'
import { observer } from '@formily/react'
import { usePageParameters } from '../../hooks'

export type ParameterSelectorProps = {
  style?: React.CSSProperties
  className?: string
  value?: string
  onChange?: (value?: string) => void
}

export const ParameterSelector: React.FC<ParameterSelectorProps> = observer(
  (props) => {
    const pageParameters = usePageParameters()

    return (
      <Select
        {...props}
        options={pageParameters.map((parameter) => ({
          value: parameter.key,
          label: parameter.key,
        }))}
      />
    )
  }
)
