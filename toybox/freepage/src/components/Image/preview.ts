import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { Image as OrgImage } from '@toy-box/freepage-components'
import { DnFC } from '@toy-box/designable-react'
import { createVoidFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export const Image: DnFC<React.ComponentProps<typeof OrgImage>> = OrgImage

Image.Behavior = createBehavior({
  name: 'Image',
  selector: (node) => node.props['x-component'] === 'Image',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Image),
  },
  designerLocales: AllLocales.Image,
})

Image.Resource = createResource({
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        title: 'Image',
        'x-component': 'Image',
      },
    },
  ],
})
