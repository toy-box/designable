import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, Schema } from '@formily/react'
import {
  Form,
  Space,
  FormGrid,
  FormLayout,
  FormCollapse,
  FormTab as Tabs,
  ArrayTable,
  ArrayCards,
  FormItem,
  Checkbox,
  Cascader,
  Editable,
  Password,
  PreviewText,
  Radio,
  Reset,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd'
import {
  Text,
  Image,
  DataView,
  FieldString as Input,
  FieldText as TextArea,
  FieldNumber as NumberPicker,
  FieldDate as DatePicker,
  FieldBoolean as Switch,
  FieldPercent as Percent,
  FieldSelect as Select,
} from '@toy-box/freepage-components'
import { Card, Slider, Rate } from 'antd'
import { TreeNode } from '@designable/core'
import { transformToSchema, reactionPatches } from '../../src'

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
    Checkbox,
    Cascader,
    Editable,
    Password,
    PreviewText,
    Radio,
    Reset,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    Text,
    Image,
    DataView,
    Input,
    TextArea,
    NumberPicker,
    DatePicker,
    Switch,
    Percent,
    Select,
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
