import React from 'react'
import { Button } from 'antd'
import { observer } from '@formily/react'
import { TextWidget, usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { ParamInput, ParamValue } from '../ParamInput'
import './styles.less'

export type ParamsSetterProps = {
  style?: React.CSSProperties
  className?: string
  value?: ParamValue[]
  onChange?: (value?: ParamValue[]) => void
}

export const ParamsSetter: React.FC<ParamsSetterProps> = observer(
  ({ value = [], onChange, style, className }) => {
    const prefix = usePrefix('params-setter')

    const handleParamChange = React.useCallback(
      (param: ParamValue, index: number) => {
        value[index] = param
        onChange && onChange(value)
      },
      [value, onChange]
    )

    const addParam = React.useCallback(() => {
      value.push({})
      onChange && onChange(value)
    }, [value])

    const handleRemove = React.useCallback(
      (index: number) => {
        value.splice(index, 1)
        onChange && onChange(value)
      },
      [value, onChange]
    )

    return (
      <div className={cls(prefix, className)} style={style}>
        {value.map((param, index) => (
          <ParamInput
            key={index}
            value={param}
            onChange={(param) => handleParamChange(param, index)}
            remove={() => handleRemove(index)}
          />
        ))}
        <Button type="dashed" onClick={addParam} block>
          <TextWidget>
            SettingComponents.ParamsBindSetter.addParameter
          </TextWidget>
        </Button>
      </div>
    )
  }
)
