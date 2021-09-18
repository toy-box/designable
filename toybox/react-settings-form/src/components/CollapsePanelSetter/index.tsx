import React, { useCallback, useContext, useMemo } from 'react'
import { Button } from 'antd'
import { SortableList } from '@toy-box/toybox-ui'
import { observer, SchemaExpressionScopeContext } from '@formily/react'
import { TreeNode } from '@designable/core'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'
import { HandleIcon } from '../HandleIcon'
import './styles.less'

export interface ICollapsePanelSetter {
  className?: string
  style?: React.CSSProperties
  defaultExpand?: boolean
}

export const CollapsePanelSetter: React.FC<ICollapsePanelSetter> = observer(
  (props) => {
    const prefix = usePrefix('collapse-panel-setter')
    const { node } = useContext(SchemaExpressionScopeContext)
    const panels = useMemo(
      () =>
        node.children.map((panel) => ({
          id: panel.id,
          header: panel.props['x-component-props'].header,
        })),
      [node.children]
    )

    const panelItem = ({ item, dragHandleProps }) => {
      return (
        <div className={`${prefix}__item`}>
          <span {...dragHandleProps} className={`${prefix}__item--handle`}>
            <HandleIcon />
          </span>
          <span>{item.header}</span>
        </div>
      )
    }

    const sortPanels = useCallback(
      (panels) => {
        node.children = panels.map((panel) =>
          node.children.find((child) => child.id === panel.id)
        )
      },
      [node]
    )

    const addPanel = useCallback(() => {
      const tabPane = new TreeNode({
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: `Panel ${node.children.length + 1}`,
          },
        },
      })
      node.append(tabPane)
    }, [node])

    return (
      <div className={cls(prefix, props.className)} style={props.style}>
        <SortableList
          onChange={sortPanels}
          dataSource={panels}
          itemRender={panelItem}
          idKey="id"
        />
        <Button type="dashed" onClick={addPanel} block>
          <TextWidget>Add Panel</TextWidget>
        </Button>
      </div>
    )
  }
)
