import React from 'react'
import { Button } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta } from '@toy-box/meta-schema'
import { TextWidget, usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { ParamBindInput, ParamBindValue } from '../ParamBindInput'
import { useAttributes } from '../../hooks'
import './styles.less'

export type ParamsBindSetterProps = {
  style?: React.CSSProperties
  className?: string
  value?: ParamBindValue[]
  onChange?: (value?: ParamBindValue[]) => void
  paramsSchema?: IFieldMeta
}

export const ParamsBindSetter: React.FC<ParamsBindSetterProps> = observer(
  ({ value = [], onChange, style, className, paramsSchema }) => {
    const attributes = useAttributes()
    const prefix = usePrefix('params-bind-setter')
    const paramKeys = React.useMemo(
      () => Object.keys(paramsSchema?.properties || {}),
      []
    )
    const handleParamChange = React.useCallback(
      (param: ParamBindValue, index: number) => {
        value[index] = param
        onChange && onChange(value)
      },
      [value, onChange]
    )

    const addParam = React.useCallback(() => {
      value.push({})
      onChange(value)
    }, [value])

    const removeItem = React.useCallback(
      (index: number) => {
        value.splice(index, 1)
        onChange(value)
      },
      [value, onChange]
    )

    return (
      <div className={cls(prefix, className)} style={style}>
        {value.map((param, index) => {
          const keys = paramKeys.filter(
            (key) => !value.some((v) => v.key === key) || param === key
          )
          return (
            <ParamBindInput
              key={index}
              dataSource={keys}
              value={param}
              paths={attributes}
              onChange={(param) => handleParamChange(param, index)}
              remove={() => removeItem(index)}
            />
          )
        })}
        <Button type="dashed" onClick={addParam} block>
          <TextWidget>
            SettingComponents.ParamsBindSetter.addParameter
          </TextWidget>
        </Button>
      </div>
    )
  }
)
