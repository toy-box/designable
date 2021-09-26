import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldNumber as OrgFieldNumber,
  FieldNumberProps,
} from '@toy-box/meta-components'

type ComposedFieldNumber = React.FC<FieldNumberProps>

export const FieldNumber: ComposedFieldNumber = connect(
  OrgFieldNumber,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldNumber, { mode: 'read' } as FieldNumberProps)
)

export default FieldNumber
