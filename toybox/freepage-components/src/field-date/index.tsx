import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldDate as OrgFieldDate,
  FieldDateProps,
} from '@toy-box/meta-components'

type ComposedFieldDate = React.FC<FieldDateProps>

export const FieldDate: ComposedFieldDate = connect(
  OrgFieldDate,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldDate, { mode: 'read' } as FieldDateProps)
)

export default FieldDate
