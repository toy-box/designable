import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { observer } from '@formily/react'
import { DnFC } from '@toy-box/designable-react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { createDataShourceSchema } from '../Field'
import { withContainer } from '../../common/Container'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import './styles.less'

export interface DataViewProps {
  metaSchema: IFieldMeta
  style: React.CSSProperties
}

export const OrgDataView: DnFC<React.FC<DataViewProps>> = observer((props) => {
  return <>{props.children}</>
})

export const DataView: DnFC<React.ComponentProps<typeof OrgDataView>> =
  withContainer(OrgDataView)

DataView.Behavior = createBehavior({
  name: 'DataView',
  selector: (node) =>
    node.props.type === 'object' && node.props['x-component'] === 'DataView',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: createDataShourceSchema(AllSchemas.DataView),
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
        dataSource: {},
        'x-component': 'DataView',
      },
    },
  ],
})
