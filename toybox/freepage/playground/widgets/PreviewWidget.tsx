import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, Schema } from '@formily/react'
import {
  Form,
  FormItem,
  Checkbox,
  Cascader,
  Editable,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab as Tabs,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd'
import {
  FieldString as Input,
  FieldText as TextArea,
  FieldNumber,
  FieldDate as DatePicker,
  FieldBoolean,
  FieldPercent as Percent,
  FieldSelect as Select,
} from '@toy-box/meta-components'
import { Card, Slider, Rate } from 'antd'
import { TreeNode } from '@designable/core'
import { transformToSchema, reactionPatches } from '../../src'

const Text: React.FC<{
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode
  return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    Tabs,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    TextArea,
    NumberPicker,
    Switch,
    Password,
    Percent,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
})

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), [])
  Schema.registerPatches(reactionPatches)

  const { form: formProps, schema } = transformToSchema(props.tree)
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  )
}
