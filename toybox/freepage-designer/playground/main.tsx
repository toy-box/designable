import 'antd/dist/antd.less'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Designer,
  DesignerWidget,
  ViewWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  WorkspacePanel,
  ViewportPanel,
  ViewPanel,
  ComponentTreeWidget,
  TopbarPanel,
  CompositePanel,
  CompositePanelContent,
} from '@toy-box/designable-react'
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@toy-box/designable-react-settings-form'
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core'
import { MetaContext, Dialog } from '@toy-box/freepage-components'
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from './widgets'
import {
  saveSchema,
  loadMetaRepoList,
  loadMetaRepoListByValue,
  loadMetaSchema,
  loadPageList,
  loadPageParameters,
} from './service'
import {
  Button,
  Card,
  DataView,
  Divider,
  Page,
  FormCollapse,
  Field,
  Image,
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
  DataGrid,
  MetaTable,
  ShadowData,
} from '../src'

setNpmCDNRegistry('//unpkg.com')

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

const designerComponents = {
  Button,
  Card,
  DataView,
  DatePicker,
  Divider,
  Page,
  FormCollapse,
  Field,
  Image,
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
  DataGrid,
  MetaTable,
  PageParams: ShadowData,
}

const designerLayouts = {
  Dialog,
}

const App = () => {
  const [leftVisible, setLeftVisible] = React.useState(false)
  const [leftActiveKey, setLeftActiveKey] = React.useState()
  const [rightVisible, setRightVisible] = React.useState(false)
  const [rightActiveKey, setRightActiveKey] = React.useState()

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
        rootComponentName: 'Page',
      }),
    []
  )
  // console.log('engine', engine)
  return (
    <Router>
      <Designer engine={engine}>
        <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
          <TopbarPanel>
            <CompositePanel
              visible={leftVisible}
              setVisible={setLeftVisible}
              activeKey={leftActiveKey}
              setActiveKey={setLeftActiveKey}
            >
              <CompositePanel.Item title="panels.Component" icon="Add" />
              <CompositePanel.Item title="panels.OutlinedTree" icon="Layer" />
              <CompositePanel.Item title="panels.History" icon="History" />
            </CompositePanel>
            <DesignerWidget />
            <ViewWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
            <CompositePanel
              direction="right"
              visible={rightVisible}
              setVisible={setRightVisible}
              activeKey={rightActiveKey}
              setActiveKey={setRightActiveKey}
            >
              <CompositePanel.Item
                title="panels.PropertySettings"
                icon="Setting"
              >
                <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
              </CompositePanel.Item>
            </CompositePanel>
          </TopbarPanel>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              height: 'calc(100% - 48px)',
            }}
          >
            <CompositePanelContent
              activeKey={leftActiveKey}
              visible={leftVisible}
              onClose={() => setLeftVisible(false)}
            >
              <CompositePanelContent.Item title="panels.Component" icon="Add">
                <ResourceWidget
                  title="sources.DataContainers"
                  sources={[DataView, DataGrid]}
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
                <ResourceWidget
                  title="sources.Displays"
                  sources={[Text, Image, Button, Divider]}
                />
                <ResourceWidget
                  title="sources.Layouts"
                  sources={[Space, FormCollapse, Tabs, Grid, Card]}
                />
              </CompositePanelContent.Item>
              <CompositePanelContent.Item
                title="panels.OutlinedTree"
                icon="Layer"
              >
                <OutlineTreeWidget />
              </CompositePanelContent.Item>
              <CompositePanelContent.Item title="panels.History" icon="History">
                <HistoryWidget />
              </CompositePanelContent.Item>
            </CompositePanelContent>
            <Workspace id="form">
              <WorkspacePanel>
                <ViewportPanel>
                  <ViewPanel type="DESIGNABLE">
                    {() => (
                      <ComponentTreeWidget
                        components={designerComponents}
                        layouts={designerLayouts}
                      />
                    )}
                  </ViewPanel>
                  <ViewPanel type="JSONTREE" scrollable={false}>
                    {(tree, onChange) => {
                      return (
                        <SchemaEditorWidget tree={tree} onChange={onChange} />
                      )
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
            <CompositePanelContent
              direction="right"
              visible={rightVisible}
              activeKey={rightActiveKey}
              onClose={() => setRightVisible(false)}
            >
              <CompositePanelContent.Item
                title="panels.PropertySettings"
                icon="Setting"
              >
                <MetaContext.Provider
                  value={{
                    loadMetaRepoList,
                    loadMetaRepoListByValue,
                    loadMetaSchema,
                    loadPageList,
                    loadPageParameters,
                  }}
                >
                  <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
                </MetaContext.Provider>
              </CompositePanelContent.Item>
            </CompositePanelContent>
          </div>
        </StudioPanel>
      </Designer>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
