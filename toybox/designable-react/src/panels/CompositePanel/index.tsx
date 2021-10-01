import React from 'react'
import cls from 'classnames'
import { Button } from '@toy-box/toybox-ui'
import { IconWidget, TextWidget } from '../../widgets'
import { usePrefix } from '../../hooks'
import './styles.less'

export type CompositePanelProps = {
  direction?: 'left' | 'right'
  defaultOpen?: boolean
  defaultPinning?: boolean
  defaultActiveKey?: number
  activeKey?: number
  setActiveKey?: (activeKey: number) => void
  visible?: boolean
  setVisible?: (isVisible: boolean) => void
}

export type CompositePanelItemProps = {
  shape?: 'tab' | 'button' | 'link'
  title?: string
  icon?: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  extra?: React.ReactNode
}

const parseItems = (
  children: React.ReactNode
): React.PropsWithChildren<CompositePanelItemProps>[] => {
  const items = []
  React.Children.forEach(children, (child) => {
    if (child['type'] === CompositePanel.Item) {
      items.push(child['props'])
    }
  })
  return items
}

export const CompositePanel: React.FC<CompositePanelProps> & {
  Item?: React.FC<CompositePanelItemProps>
} = (props) => {
  const prefix = usePrefix('composite-panel')
  const items = parseItems(props.children)

  return (
    <div
      className={cls(prefix, {
        [`direction-${props.direction}`]: !!props.direction,
      })}
    >
      <div className={prefix + '-tabs'}>
        {items.map((item, index) => {
          const takeTab = () => {
            if (item.href) {
              return <a href={item.href}>{item.icon}</a>
            }
            return (
              <Button.Icon
                tooltip={<TextWidget token={item.title} />}
                placement="bottom"
                icon={<IconWidget infer={item.icon} />}
              />
            )
          }
          const shape = item.shape ?? 'tab'
          const Comp = shape === 'link' ? 'a' : 'div'
          return (
            <Comp
              className={cls(prefix + '-tabs-pane', {
                active: props.activeKey === index && props.visible,
              })}
              key={index}
              href={item.href}
              onClick={(e: any) => {
                if (shape === 'tab') {
                  if (index === props.activeKey) {
                    props.setVisible(!props.visible)
                  } else {
                    props.setVisible(true)
                  }
                  props.setActiveKey(index)
                }
                item.onClick?.(e)
              }}
            >
              {takeTab()}
            </Comp>
          )
        })}
      </div>
    </div>
  )
}

CompositePanel.Item = () => {
  return <React.Fragment />
}
