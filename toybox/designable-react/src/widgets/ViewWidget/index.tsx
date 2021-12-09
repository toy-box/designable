import React from 'react'
import cls from 'classnames'
import { Button } from '@toy-box/toybox-ui'
import { observer } from '@formily/reactive-react'
import { WorkbenchTypes } from '@designable/core'
import { IconWidget } from '../IconWidget'
import { usePrefix, useWorkbench } from '../../hooks'
import './styles.less'

export interface ViewWidgetProps {
  use?: WorkbenchTypes[]
  style?: React.CSSProperties
  className?: string
}

export const ViewWidget: React.FC<ViewWidgetProps> = observer(
  ({ use, style, className }) => {
    const workbench = useWorkbench()
    const prefix = usePrefix('view-tools')
    const panelBoxCls = usePrefix('panel-box')

    return (
      <div className={cls(prefix, panelBoxCls, className)} style={style}>
        {use.includes('DESIGNABLE') && (
          <Button.Icon
            disabled={workbench.type === 'DESIGNABLE'}
            onClick={() => {
              workbench.type = 'DESIGNABLE'
            }}
            size={'huge'}
            icon={<IconWidget infer="Design" />}
          />
        )}
        {use.includes('JSONTREE') && (
          <Button.Icon
            disabled={workbench.type === 'JSONTREE'}
            onClick={() => {
              workbench.type = 'JSONTREE'
            }}
            size={'huge'}
            icon={<IconWidget infer="JSON" />}
          />
        )}
        {use.includes('MARKUP') && (
          <Button.Icon
            disabled={workbench.type === 'MARKUP'}
            onClick={() => {
              workbench.type = 'MARKUP'
            }}
            size={'huge'}
            icon={<IconWidget infer="Code" />}
          />
        )}
        {use.includes('PREVIEW') && (
          <Button.Icon
            disabled={workbench.type === 'PREVIEW'}
            onClick={() => {
              workbench.type = 'PREVIEW'
            }}
            size={'huge'}
            icon={<IconWidget infer="Play" />}
          />
        )}
      </div>
    )
  }
)

ViewWidget.defaultProps = {
  use: ['DESIGNABLE', 'JSONTREE', 'PREVIEW'],
}
