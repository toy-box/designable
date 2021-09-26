import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldText as OrgFieldText,
  FieldTextProps,
} from '@toy-box/meta-components'

type ComposedFieldText = React.FC<FieldTextProps>

export const FieldText: ComposedFieldText = connect(
  OrgFieldText,
  mapProps((props, field) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(OrgFieldText, { mode: 'read' } as FieldTextProps)
)

export default FieldText
