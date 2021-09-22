import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { observer } from '@formily/react'
import { usePrefix, DnFC } from '@designable/react'
import { IFieldMeta } from '@toy-box/meta-schema'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'

export interface DataViewProps {
  metaSchema: IFieldMeta
  style: React.CSSProperties
}

export const DataView: DnFC<React.FC<DataViewProps>> = observer((props) => {
  const prefix = usePrefix('data-view')

  return (
    <div {...props} className={prefix}>
      {props.children}
    </div>
  )
})

DataView.Behavior = createBehavior({
  name: 'DataView',
  selector: (node) => node.props['x-component'] === 'DataView',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: AllSchemas.DataView,
    }
  },
  designerLocales: AllLocales.DataView,
})

DataView.Resource = createResource({
  title: { 'zh-CN': '业务数据', 'en-US': 'DataView' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'DataView',
      },
    },
  ],
})
