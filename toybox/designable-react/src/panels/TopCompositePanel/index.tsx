import React, { useEffect, useState } from 'react'
import cls from 'classnames'
import { isValid } from '@designable/shared'
import { Button } from '@toy-box/toybox-ui'
import { IconWidget, TextWidget } from '../../widgets'
import { usePrefix } from '../../hooks'
import './styles.less'

export type TopCompositePanelProps = {
  direction?: 'left' | 'right'
  defaultOpen?: boolean
  defaultPinning?: boolean
  defaultActiveKey?: number
  activeKey?: number
  onChange?: (activeKey: number) => void
}

export type TopCompositePanelItemProps = {
  shape?: 'tab' | 'button' | 'link'
  title?: React.ReactNode
  icon?: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  extra?: React.ReactNode
}

const parseItems = (
  children: React.ReactNode
): React.PropsWithChildren<TopCompositePanelItemProps>[] => {
  const items = []
  React.Children.forEach(children, (child) => {
    if (child['type'] === TopCompositePanel.Item) {
      items.push(child['props'])
    }
  })
  return items
}

export const TopCompositePanel: React.FC<TopCompositePanelProps> & {
  Item?: React.FC<TopCompositePanelItemProps>
} = (props) => {
  const prefix = usePrefix('top-composite-panel')
  const [activeKey, setActiveKey] = useState(props.defaultActiveKey ?? -1)
  const [visible, setVisible] = useState(props.defaultOpen ?? true)
  const items = parseItems(props.children)
  const currentItem = items?.[activeKey]
  const content = currentItem?.children

  useEffect(() => {
    if (isValid(props.activeKey)) {
      if (props.activeKey !== activeKey) {
        setActiveKey(props.activeKey)
      }
    }
  }, [props.activeKey, activeKey])

  const renderContent = () => {
    if (!content || !visible) return
    return (
      <div className={cls(prefix + '-tabs-content')}>
        <div className={prefix + '-tabs-header'}>
          <div className={prefix + '-tabs-header-title'}>
            <TextWidget>{currentItem.title}</TextWidget>
          </div>
          <div className={prefix + '-tabs-header-actions'}>
            <div className={prefix + '-tabs-header-extra'}>
              {currentItem.extra}
            </div>
            <IconWidget
              infer="Close"
              className={prefix + '-tabs-header-close'}
              onClick={() => {
                setVisible(false)
              }}
            />
          </div>
        </div>
        <div className={prefix + '-tabs-body'}>{content}</div>
      </div>
    )
  }

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
                tooltip={item.title.toString()}
                icon={<IconWidget infer={item.icon} />}
              />
            )
          }
          const shape = item.shape ?? 'tab'
          const Comp = shape === 'link' ? 'a' : 'div'
          return (
            <Comp
              className={cls(prefix + '-tabs-pane', {
                active: activeKey === index && visible,
              })}
              key={index}
              href={item.href}
              onClick={(e: any) => {
                if (shape === 'tab') {
                  if (index === activeKey) {
                    setVisible(!visible)
                  } else {
                    setVisible(true)
                  }
                  setActiveKey(index)
                }
                item.onClick?.(e)
              }}
            >
              {takeTab()}
            </Comp>
          )
        })}
      </div>
      {renderContent()}
    </div>
  )
}

TopCompositePanel.Item = () => {
  return <React.Fragment />
}
