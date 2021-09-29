import React, { useEffect, useState } from 'react'
import cls from 'classnames'
import { isValid } from '@designable/shared'
import { IconWidget, TextWidget } from '../../widgets'
import { usePrefix } from '../../hooks'
import './styles.less'

export type CompositePanelContentItemProps = {
  shape?: 'tab' | 'button' | 'link'
  title?: React.ReactNode
  icon?: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  extra?: React.ReactNode
}

export type CompositePanelContentProps = {
  direction?: 'left' | 'right'
  activeKey?: number
  visible?: boolean
  onClose?: () => void
}

const parseItems = (
  children: React.ReactNode
): React.PropsWithChildren<CompositePanelContentItemProps>[] => {
  const items = []
  React.Children.forEach(children, (child) => {
    if (child['type'] === CompositePanelContent.Item) {
      items.push(child['props'])
    }
  })
  return items
}

export const CompositePanelContent: React.FC<CompositePanelContentProps> & {
  Item?: React.FC<CompositePanelContentItemProps>
} = ({ direction, activeKey, visible, onClose, children }) => {
  const prefix = usePrefix('composite-panel-content')
  const items = parseItems(children)
  const currentItem = items?.[activeKey]
  const content = currentItem?.children

  const renderContent = () => {
    if (!content || !visible) return
    return (
      <div
        className={cls(prefix + '-item', {
          [`direction-${direction}`]: !!direction,
        })}
      >
        <div className={prefix + '-item-header'}>
          <div className={prefix + '-item-header-title'}>
            <TextWidget>{currentItem.title}</TextWidget>
          </div>
          <div className={prefix + '-item-header-actions'}>
            <div className={prefix + '-item-header-extra'}>
              {currentItem.extra}
            </div>
            <IconWidget
              infer="Close"
              className={prefix + '-item-header-close'}
              onClick={onClose}
            />
          </div>
        </div>
        <div className={prefix + '-item-body'}>{content}</div>
      </div>
    )
  }

  return <React.Fragment>{renderContent()}</React.Fragment>
}

CompositePanelContent.Item = () => {
  return <React.Fragment />
}
