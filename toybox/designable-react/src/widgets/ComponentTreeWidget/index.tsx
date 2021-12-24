import React, { Fragment, useEffect } from 'react'
import { useTree, usePrefix, useDesigner, useComponents } from '../../hooks'
import { TreeNodeContext, DesignerComponentsContext } from '../../context'
import { IDesignerComponents, PageLayouts } from '../../types'
import { TreeNode, GlobalRegistry } from '@designable/core'
import { observer } from '@formily/reactive-react'
import cls from 'classnames'
import { Dialog } from '@toy-box/freepage-components'
import './styles.less'

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties
  className?: string
  layouts?: PageLayouts
  components: IDesignerComponents
}

export interface ITreeNodeWidgetProps {
  node: TreeNode
  children?: React.ReactChild
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = observer(
  (props: ITreeNodeWidgetProps) => {
    const designer = useDesigner(props.node?.designerProps?.effects)
    const components = useComponents()
    const node = props.node
    const renderChildren = () => {
      if (node?.designerProps?.selfRenderChildren) return []
      return node?.children?.map((child) => {
        return <TreeNodeWidget key={child.id} node={child} />
      })
    }
    const renderProps = (extendsProps: any = {}) => {
      const props = {
        ...node.designerProps?.defaultProps,
        ...extendsProps,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      }
      return props
    }
    const renderComponent = () => {
      const componentName = node.componentName
      const Component = components[componentName]
      const dataId = {}
      if (Component) {
        if (designer) {
          dataId[designer?.props?.nodeIdAttrName] = node.id
        }
        return React.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren()
        )
      } else {
        if (node?.children?.length) {
          return <Fragment>{renderChildren()}</Fragment>
        }
      }
    }

    if (!node) return null
    if (node.hidden) return null
    return React.createElement(
      TreeNodeContext.Provider,
      { value: node },
      renderComponent()
    )
  }
)

export const ComponentTreeWidget: React.FC<IComponentTreeWidgetProps> =
  observer((props: IComponentTreeWidgetProps) => {
    const tree = useTree()
    const prefix = usePrefix('component-tree')
    const designer = useDesigner()
    const dataId = {}
    if (designer && tree) {
      dataId[designer?.props?.nodeIdAttrName] = tree.id
    }
    useEffect(() => {
      GlobalRegistry.registerDesignerBehaviors(props.components)
    }, [])
    const { layout } = tree.props
    const LayoutComponent = props.layouts?.[layout] || React.Fragment
    return (
      <Dialog>
        <div
          style={{ ...props.style }}
          className={cls(prefix, props.className)}
          {...dataId}
        >
          <DesignerComponentsContext.Provider value={props.components}>
            <TreeNodeWidget node={tree} />
          </DesignerComponentsContext.Provider>
        </div>
      </Dialog>
    )
  })

ComponentTreeWidget.displayName = 'ComponentTreeWidget'
