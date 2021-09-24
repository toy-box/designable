import React, { useCallback, useEffect, useState } from 'react'
import { useField, observer, Field } from '@formily/react'
import { FormItem } from '@formily/antd'
import { Switch } from 'antd'
import { usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { FormulaInput } from '../FormulaInput'
import './styles.less'

export interface IVisibilitySetterProps {
  className?: string
  style?: React.CSSProperties
  value?: any
  onChange?: (value: any) => void
}

export const VisibilitySetter: React.FC<IVisibilitySetterProps> = observer(
  (props) => {
    const field = useField<Formily.Core.Models.Field>()
    const prefix = usePrefix('visibility-setter')
    const [active, setActive] = useState(false)

    const handleActive = useCallback(
      (active: boolean) => {
        if (active) {
          props.onChange?.({
            type: 'formula',
            formula: '',
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
        <Field
          name="formula"
          basePath={field.address}
          visible={active}
          reactions={(field) => {
            field.visible = field.parent.value?.type === 'formula'
          }}
          component={[FormulaInput]}
        />
      </>
    )
  }
)
