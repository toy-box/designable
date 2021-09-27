import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldPercent as OrgFieldPercent,
  FieldPercentProps,
} from '@toy-box/meta-components'

type ComposedFieldPercent = React.FC<FieldPercentProps>

export const FieldPercent: ComposedFieldPercent = connect(
  OrgFieldPercent,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldPercent, { mode: 'read' } as FieldPercentProps)
)

export default FieldPercent
