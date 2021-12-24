import React from 'react'
import cls from 'classnames'
import { Button } from 'antd'
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

  return (
    <div
      className={cls(`${prefixCls}-wrap`, wrapClassName)}
      style={{ position: 'relative', zIndex: 0 }}
    >
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{'title'}</div>
        </div>
        <div className={`${prefixCls}-body`}>{children}</div>
      </div>
    </div>
  )
}
