import React, { Fragment, useRef } from 'react'
import { InputNumber } from 'antd'
import { Button } from '@toy-box/toybox-ui'
import { observer } from '@formily/reactive-react'
import { CursorType, ScreenType } from '@designable/core'
import {
  useCursor,
  useHistory,
  useScreen,
  usePrefix,
  useWorkbench,
} from '../../hooks'
import { IconWidget } from '../IconWidget'
import cls from 'classnames'
import './styles.less'

type DesignerType = 'HISTORY' | 'CURSOR' | 'SCREEN_TYPE'

export type DesignerWidgetProps = {
  className?: string
  style?: React.CSSProperties
  use?: DesignerType[]
}

export const DesignerWidget: React.FC<DesignerWidgetProps> = observer(
  (props) => {
    const screen = useScreen()
    const cursor = useCursor()
    const workbench = useWorkbench()
    const history = useHistory()
    const sizeRef = useRef<{ width?: any; height?: any }>({})
    const panelBoxCls = usePrefix('panel-box')

    const renderHistoryController = () => {
      if (!props.use.includes('HISTORY')) return null
      return (
        <div className={cls(panelBoxCls, props.className)}>
          <Button.Icon
            disabled={!history?.allowUndo}
            onClick={() => {
              history.undo()
            }}
            size="huge"
            icon={<IconWidget infer="Undo" />}
          />
          <Button.Icon
            disabled={!history?.allowRedo}
            onClick={() => {
              history.redo()
            }}
            size="huge"
            icon={<IconWidget infer="Redo" />}
          />
        </div>
      )
    }

    const renderCursorController = () => {
      if (workbench.type !== 'DESIGNABLE') return null
      if (!props.use.includes('CURSOR')) return null
      return (
        <div className={cls(panelBoxCls, props.className)}>
          <Button.Icon
            disabled={cursor.type === CursorType.Move}
            onClick={() => {
              cursor.setType(CursorType.Move)
            }}
            size="huge"
            icon={<IconWidget infer="Move" />}
          />
          <Button.Icon
            disabled={cursor.type === CursorType.Selection}
            onClick={() => {
              cursor.setType(CursorType.Selection)
            }}
            size="huge"
            icon={<IconWidget infer="Selection" />}
          />
        </div>
      )
    }

    const renderResponsiveController = () => {
      if (!props.use.includes('SCREEN_TYPE')) return null
      if (screen.type !== ScreenType.Responsive) return null
      return (
        <div className={cls(panelBoxCls, props.className)}>
          <InputNumber
            size="small"
            value={screen.width}
            style={{ width: 70, textAlign: 'center' }}
            onChange={(value) => {
              sizeRef.current.width = value
            }}
            onPressEnter={() => {
              screen.setSize(sizeRef.current.width, screen.height)
            }}
          />
          <IconWidget
            size={10}
            infer="Close"
            style={{ padding: '0 3px', color: '#999' }}
          />
          <InputNumber
            value={screen.height}
            size="small"
            style={{
              width: 70,
              textAlign: 'center',
              marginRight: 10,
            }}
            onChange={(value) => {
              sizeRef.current.height = value
            }}
            onPressEnter={() => {
              screen.setSize(screen.width, sizeRef.current.height)
            }}
          />
          {(screen.width !== '100%' || screen.height !== '100%') && (
            <Button.Icon
              onClick={() => {
                screen.resetSize()
              }}
              size="huge"
              icon={<IconWidget infer="Recover" />}
            />
          )}
        </div>
      )
    }

    const renderScreenTypeController = () => {
      if (!props.use.includes('SCREEN_TYPE')) return null
      return (
        <div className={cls(panelBoxCls, props.className)}>
          <div
            className={cls(`${panelBoxCls}-item`, {
              active: screen.type === ScreenType.PC,
            })}
          >
            <Button.Icon
              onClick={() => {
                screen.setType(ScreenType.PC)
              }}
              pure
              size="huge"
              icon={<IconWidget infer="PC" />}
            />
          </div>
          <div
            className={cls(`${panelBoxCls}-item`, {
              active: screen.type === ScreenType.Mobile,
            })}
          >
            <Button.Icon
              onClick={() => {
                screen.setType(ScreenType.Mobile)
              }}
              size="huge"
              pure
              icon={<IconWidget infer="Mobile" />}
            />
          </div>
          {/* <div className={cls(`${panelBoxCls}-item`, { active: screen.type === ScreenType.Responsive })}>
            <Button.Icon
              onClick={() => {
                screen.setType(ScreenType.Responsive)
              }}
              pure
              size="huge"
              icon={<IconWidget infer="Responsive" />}
            />
          </div> */}
        </div>
      )
    }

    return (
      <React.Fragment>
        {renderScreenTypeController()}
        {renderResponsiveController()}
        {renderCursorController()}
        {renderHistoryController()}
      </React.Fragment>
    )
  }
)

DesignerWidget.defaultProps = {
  use: ['HISTORY', 'CURSOR', 'SCREEN_TYPE'],
}
