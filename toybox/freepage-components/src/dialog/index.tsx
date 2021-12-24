import React from 'react'
import cls from 'classnames'
import { ConfigContext } from 'antd/es/config-provider'
import { CloseOutlined } from '@ant-design/icons'

export interface IDialog {
  title?: string
  wrapClassName?: string
}

export const Dialog: React.FC<IDialog> = (props) => {
  const { children, title, wrapClassName } = props
  const { getPrefixCls, direction } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('modal')

  const headerNode = (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-title`}>{title}</div>
    </div>
  )

  const closer = (
    <button type="button" aria-label="Close" className={`${prefixCls}-close`}>
      {CloseOutlined}
    </button>
  )

  const content = (
    <div className={`${prefixCls}-content`}>
      {closer}
      {headerNode}
      <div className={`${prefixCls}-body`}>{children}</div>
    </div>
  )

  return (
    <div className={cls(`${prefixCls}-wrap`, wrapClassName)}>{content}</div>
  )
}
