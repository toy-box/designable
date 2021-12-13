import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, Schema } from '@formily/react'
import {
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
  ActionContext,
  Button,
  Container,
  MetaContext,
  Page,
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
  PageParams,
} from '@toy-box/freepage-components'
import { Card, Slider, Rate } from 'antd'
import { TreeNode } from '@designable/core'
import { transformToSchema, schemaPatch } from '../../src'
import {
  loadMetaRepoList,
  loadMetaRepoListByValue,
  loadMetaSchema,
  loadMetaData,
  loadMetaDataList,
  loadMetaDataPageable,
  handleLinkAction,
  handlePageAction,
  handleAutoflowAction,
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
    Container,
    MetaTable: DataGrid.MetaTable,
    PageParams,
  },
})

const $PageParams = {
  type: 'object',
  'x-component': 'PageParams',
}

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), [])
  const [formProps, setFormProps] = React.useState<any>()
  const [schema, setSchema] = React.useState<any>()
  Schema.registerPatches(schemaPatch)
  React.useEffect(() => {
    transformToSchema(props.tree, {}, { loadMetaSchema }, { $PageParams }).then(
      ({ form: formProps, schema }) => {
        setFormProps(formProps)
        setSchema(schema)
      }
    )
  }, [props.tree])
  return (
    <Page {...formProps} form={form}>
      <ActionContext.Provider
        value={{
          handleLinkAction,
          handlePageAction,
          handleAutoflowAction,
        }}
      >
        <MetaContext.Provider
          value={{
            loadMetaRepoList,
            loadMetaRepoListByValue,
            loadMetaSchema,
            loadMetaData,
            loadMetaDataList,
            loadMetaDataPageable,
          }}
        >
          <SchemaField schema={schema} />
        </MetaContext.Provider>
      </ActionContext.Provider>
    </Page>
  )
}
