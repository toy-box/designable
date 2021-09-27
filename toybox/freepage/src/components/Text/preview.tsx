import React from 'react'
import { Text as OrgText } from '@toy-box/freepage-components'
import { DnFC } from '@toy-box/designable-react'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Text: DnFC<React.ComponentProps<typeof OrgText>> = (props) => {
  return <OrgText {...props} freeArr="free-arr" />
}

Text.Behavior = createBehavior({
  name: 'Text',
  selector: (node) => node.props['x-component'] === 'Text',
  designerProps: {
    droppable: false,
    propsSchema: createVoidFieldSchema(AllSchemas.Text),
  },
  designerLocales: AllLocales.Text,
})

Text.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Text',
        'x-component-props': {
          content: 'Text',
          type: 'Text',
        },
      },
    },
  ],
})
