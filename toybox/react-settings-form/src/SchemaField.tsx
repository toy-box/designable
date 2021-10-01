import { createSchemaField } from '@formily/react'
import {
  FormItem,
  Input,
  NumberPicker,
  DatePicker,
  TimePicker,
  Select,
  Radio,
  Switch,
  Space,
  ArrayItems,
  ArrayTable,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
} from '@formily/antd'
import { Slider } from 'antd'
import { Select as SelectPro } from '@toy-box/toybox-ui'
import {
  SizeInput,
  ColorInput,
  ImageInput,
  BackgroundImageInput,
  PositionInput,
  CornerInput,
  MonacoInput,
  ValueInput,
  BoxStyleSetter,
  BorderStyleSetter,
  BorderRadiusStyleSetter,
  BackgroundStyleSetter,
  BoxShadowStyleSetter,
  FontStyleSetter,
  DisplayStyleSetter,
  FlexStyleSetter,
  DrawerSetter,
  CollapseItem,
  CollapsePanelSetter,
  TabsPaneSetter,
  VisibilitySetter,
  FieldBindSetter,
} from './components'

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    CollapsePanelSetter,
    CollapseItem,
    TabsPaneSetter,
    Input,
    ValueInput,
    SizeInput,
    ColorInput,
    ImageInput,
    MonacoInput,
    PositionInput,
    CornerInput,
    BackgroundImageInput,
    BackgroundStyleSetter,
    BoxStyleSetter,
    BorderStyleSetter,
    BorderRadiusStyleSetter,
    DisplayStyleSetter,
    BoxShadowStyleSetter,
    FlexStyleSetter,
    FontStyleSetter,
    DrawerSetter,
    NumberPicker,
    DatePicker,
    TimePicker,
    Select,
    Radio,
    Slider,
    Switch,
    Space,
    ArrayItems,
    ArrayTable,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
    VisibilitySetter,
    FieldBindSetter,
    SelectPro,
  },
})
