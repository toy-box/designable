import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldSelect as OrgFieldSelect,
  FieldSelectProps,
} from '@toy-box/meta-components'

type ComposedFieldSelect = React.FC<FieldSelectProps>

export const FieldSelect: ComposedFieldSelect = connect(
  OrgFieldSelect,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldSelect, { mode: 'read' } as FieldSelectProps)
)

export default FieldSelect
