import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, ISchema, Schema } from '@formily/react'
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
  IActionContextProps,
  MetaContext,
  MetaContextProps,
  Button,
  Container,
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
import { schemaPatch } from '.'

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
    PageParams,
  },
})

export type FreePageProps = {
  pageProps: any
  schema: ISchema
  action: IActionContextProps
  meta: MetaContextProps
}

export const FreePage: React.FC<FreePageProps> = (props) => {
  const { pageProps, schema, action, meta } = props
  const form = useMemo(() => createForm(), [])
  Schema.registerPatches(schemaPatch)

  return (
    <Page {...pageProps} form={form}>
      <ActionContext.Provider value={action}>
        <MetaContext.Provider value={meta}>
          <SchemaField schema={schema} />
        </MetaContext.Provider>
      </ActionContext.Provider>
    </Page>
  )
}
