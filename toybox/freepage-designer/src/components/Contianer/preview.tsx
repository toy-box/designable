import React from 'react'
import { observer } from '@formily/reactive-react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@toy-box/designable-react'
import { Contianer as OrgContainer } from '@toy-box/freepage-components'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Container: DnFC<React.ComponentProps<typeof OrgContainer>> =
  observer((props) => {
    return <OrgContainer {...props} />
  })

Container.Behavior = createBehavior({
  name: 'Container',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Container',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.Container),
  },
  designerLocales: AllLocales.Container,
})

Container.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Container',
      },
    },
  ],
})
