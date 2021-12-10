import React, { useCallback, useEffect, useState } from 'react'
import { useField, observer, Field as FieldComponent } from '@formily/react'
import { Field } from '@formily/core'
import { FormItem } from '@formily/antd'
import { Switch } from 'antd'
import { usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { MetaValueType } from '@toy-box/meta-schema'
import { ExpressionInput } from '../ExpressionInput'
import './styles.less'

export interface IEditablilitySetterProps {
  className?: string
  style?: React.CSSProperties
  value?: any
  onChange?: (value: any) => void
}

export const EditabilitySetter: React.FC<IEditablilitySetterProps> = observer(
  (props) => {
    const field = useField<Field>()
    const prefix = usePrefix('editablility-setter')
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
        <FieldComponent
          name="expression"
          basePath={field.address}
          visible={active}
          reactions={(field) => {
            field.visible = (field.parent as Field).value?.type === 'expression'
          }}
          component={[ExpressionInput, { valueType: MetaValueType.BOOLEAN }]}
          decorator={[FormItem.BaseItem]}
        />
      </>
    )
  }
)
