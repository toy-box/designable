import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  FieldString as OrgFieldString,
  FieldStringProps,
} from '@toy-box/meta-components'
import { LoadingOutlined } from '@ant-design/icons'

type ComposedFieldString = React.FC<FieldStringProps>

export const FieldString: ComposedFieldString = connect(
  OrgFieldString,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffix
          )}
        </span>
      ),
    }
  }),
  mapReadPretty(OrgFieldString, { mode: 'read' } as FieldStringProps)
)

export default FieldString
