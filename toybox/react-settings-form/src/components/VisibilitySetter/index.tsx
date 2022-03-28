import React, { useCallback, useMemo, useEffect, useState } from 'react'
import cls from 'classnames'
import { Field } from '@formily/core'
import { Field as FieldComponent, useField, observer } from '@formily/react'
import { FormItem } from '@formily/antd'
import { Switch } from 'antd'
import { usePrefix } from '@toy-box/designable-react'
import { MetaValueType } from '@toy-box/meta-schema'
import { ExpressionInput } from '../ExpressionInput'
import './styles.less'
import { usePageParameters, useVariableMap } from '../../hooks'

export interface IVisibilitySetterProps {
  className?: string
  style?: React.CSSProperties
  value?: any
  onChange?: (value: any) => void
}

export const VisibilitySetter: React.FC<IVisibilitySetterProps> = observer(
  (props) => {
    const prefix = usePrefix('visibility-setter')
    const { variableMap } = useVariableMap()
    const field = useField<Field>()
    const [active, setActive] = useState(false)

    const handleActive = useCallback(
      (active: boolean) => {
        if (active) {
          props.onChange?.({
            type: 'expression',
            expression: '',
          })
        } else {
          props.onChange?.(undefined)
        }
        setActive(active)
      },
      [setActive]
    )

    const handleExpression = useCallback(
      (expression: string) => {
        if (active) {
          props.onChange?.({
            type: 'expression',
            expression,
          })
        }
      },
      [active]
    )

    useEffect(() => {
      if (field.value && field.value.type) {
        setActive(true)
      }
    }, [])

    return (
      <>
        <FormItem.BaseItem
          label={field.title}
          className={cls(prefix, props.className)}
          style={props.style}
        >
          <Switch checked={active} onChange={handleActive} />
        </FormItem.BaseItem>
        {active && (
          <FormItem.BaseItem layout={'vertical'}>
            <ExpressionInput
              value={props.value?.expression}
              onChange={handleExpression}
              valueType={MetaValueType.BOOLEAN}
            />
          </FormItem.BaseItem>
        )}
      </>
    )
  }
)
