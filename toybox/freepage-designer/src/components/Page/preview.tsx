import React, { useMemo } from 'react'
import { createBehavior, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { Form as FormilyForm } from '@formily/antd'
import { usePrefix, DnFC } from '@toy-box/designable-react'
import { createPageFieldSchema } from '../Field'
import * as AllSchemas from '../../schemas'
import * as AllLocales from '../../locales'
import './styles.less'

export const Page: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyForm
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </FormilyForm>
    )
  }
)

Page.Behavior = createBehavior({
  name: 'Page',
  selector: (node) => node.componentName === 'Page',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: createPageFieldSchema(AllSchemas.Page),
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    }
  },
  designerLocales: AllLocales.Page,
})

Page.Resource = createResource({
  title: { 'zh-CN': '页面', 'en-US': 'Page' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Page',
      },
    },
  ],
})
