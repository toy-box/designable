import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldBoolean as OrgFieldBoolean,
  FieldBooleanProps,
} from '@toy-box/meta-components'

type ComposedFieldBoolean = React.FC<FieldBooleanProps>

export const FieldBoolean: ComposedFieldBoolean = connect(
  OrgFieldBoolean,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldBoolean, { mode: 'read' } as FieldBooleanProps)
)

export default FieldBoolean
