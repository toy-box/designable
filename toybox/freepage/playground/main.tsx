import 'antd/dist/antd.less'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer,
  DesignerToolsWidget,
  DesignerWidget,
  ViewToolsWidget,
  ViewWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  MainPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
  TopbarPanel,
  TopCompositePanel,
} from '@toy-box/designable-react'
import { SettingsForm } from '@toy-box/designable-react-settings-form'
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core'
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from './widgets'
import { saveSchema } from './service'
import {
  Card,
  DataView,
  Form,
  FormCollapse,
  Field,
  Input,
  NumberPicker,
  Percent,
  DatePicker,
  Grid,
  Select,
  Space,
  Switch,
  Tabs,
  Text,
  TextArea,
  ObjectContainer,
} from '../src'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
      DataContainers: '数据容器',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
      DataContainers: 'Data Containers',
    },
  },
})

const designeComponents = {
  Card,
  DataView,
  DatePicker,
  Form,
  FormCollapse,
  Field,
  Input,
  TextArea,
  NumberPicker,
  Percent,
  Grid,
  Select,
  Space,
  Switch,
  Tabs,
  ObjectContainer,
  Text,
}

const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  return (
    <Designer engine={engine}>
      <MainPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <TopbarPanel>
          <TopCompositePanel>
            <TopCompositePanel.Item title="panels.Component" icon="Add">
              <ResourceWidget
                title="sources.DataContainers"
                sources={[DataView]}
              />
              <ResourceWidget
                title="sources.Inputs"
                sources={[
                  Input,
                  TextArea,
                  NumberPicker,
                  Percent,
                  Switch,
                  DatePicker,
                  Select,
                  ObjectContainer,
                ]}
              />
              <ResourceWidget title="sources.Displays" sources={[Text]} />
              <ResourceWidget
                title="sources.Layouts"
                sources={[Space, FormCollapse, Tabs, Grid, Card]}
              />
            </TopCompositePanel.Item>
            <TopCompositePanel.Item title="panels.OutlinedTree" icon="Layer">
              <OutlineTreeWidget />
            </TopCompositePanel.Item>
            <TopCompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </TopCompositePanel.Item>
          </TopCompositePanel>
          <DesignerWidget />
          <ViewWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
          <TopCompositePanel direction="right">
            <TopCompositePanel.Item
              title="panels.PropertySettings"
              icon="Setting"
            >
              <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
            </TopCompositePanel.Item>
          </TopCompositePanel>
        </TopbarPanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => <ComponentTreeWidget components={designeComponents} />}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => {
                  return <SchemaEditorWidget tree={tree} onChange={onChange} />
                }}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
      </MainPanel>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
