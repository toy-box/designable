import React, { useCallback, useEffect, useState } from 'react'
import { Field } from '@formily/core'
import { Field as FieldComponent, useField, observer } from '@formily/react'
import { FormItem } from '@formily/antd'
import { Switch } from 'antd'
import { usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { ExpressionInput } from '../ExpressionInput'
import './styles.less'

export interface IVisibilitySetterProps {
  className?: string
  style?: React.CSSProperties
  value?: any
  onChange?: (value: any) => void
}

export const VisibilitySetter: React.FC<IVisibilitySetterProps> = observer(
  (props) => {
    const field = useField<Field>()
    const prefix = usePrefix('visibility-setter')
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
        <FormItem.BaseItem className={cls(prefix, props.className)}>
          <FieldComponent
            name="expression"
            basePath={field.address}
            visible={active}
            reactions={(field) => {
              field.visible =
                (field.parent as Field).value?.type === 'expression'
            }}
            component={[ExpressionInput]}
          />
        </FormItem.BaseItem>
      </>
    )
  }
)
