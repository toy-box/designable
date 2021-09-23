import React, { useMemo } from 'react'
import { Select } from 'antd'
import { observer } from '@formily/react'
import { usePrefix } from '@designable/react'
import { useScope } from '../../hooks'

export interface IFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const FieldBindSetter: React.FC<IFieldBindSetterProps> = observer(
  ({ value, onChange }) => {
    const prefix = usePrefix('field-bind-setter')
    const { node } = useScope()
    const dataView = useMemo(
      () =>
        node
          .getParents()
          .find((node) => node.props['x-component'] === 'DataView'),
      [node]
    )
    return (
      <React.Fragment>
        <Select disabled={dataView == null} value={value} onChange={onChange} />
      </React.Fragment>
    )
  }
)
