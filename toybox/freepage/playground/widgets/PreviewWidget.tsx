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
  MetaContext,
  Button,
  Text,
  Image,
  DataView,
  DataGrid,
  Divider,
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
import {
  saveSchema,
  loadMetaRepoList,
  loadMetaRepoListByValue,
  loadMetaSchema,
  loadMetaData,
  loadMetaDataList,
} from '../service'

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
    Button,
    Text,
    Image,
    DataView,
    DataGrid,
    Input,
    TextArea,
    NumberPicker,
    DatePicker,
    Switch,
    Percent,
    Select,
    Divider,
    MetaTable: DataGrid.MetaTable,
  },
})

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), [])
  const [formProps, setFormProps] = React.useState<any>()
  const [schema, setSchema] = React.useState<any>()
  Schema.registerPatches(reactionPatches)
  React.useEffect(() => {
    transformToSchema(props.tree, {}, { loadMetaSchema }).then(
      ({ form: formProps, schema }) => {
        setFormProps(formProps)
        setSchema(schema)
      }
    )
  }, [props.tree])
  // const { form: formProps, schema } = await transformToSchema(props.tree)
  return (
    <Form {...formProps} form={form}>
      <MetaContext.Provider
        value={{
          loadMetaRepoList,
          loadMetaRepoListByValue,
          loadMetaSchema,
          loadMetaData,
          loadMetaDataList,
        }}
      >
        <SchemaField schema={schema} />
      </MetaContext.Provider>
    </Form>
  )
}
