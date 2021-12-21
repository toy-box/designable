import React from 'react'
import cls from 'classnames'
import { Button } from 'antd'
import { observer } from '@formily/react'
import { useMeta } from '@toy-box/freepage-components'
import { TextWidget, usePrefix } from '@toy-box/designable-react'
import { ParamBindInput, ParamBindValue } from '../ParamBindInput'
import { ParamValue } from '../ParamInput'
import './styles.less'

export type ParamsBindSetterProps = {
  style?: React.CSSProperties
  className?: string
  value?: ParamBindValue[]
  onChange?: (value?: ParamBindValue[]) => void
  remoteId?: string
}

export const ParamsBindSetter: React.FC<ParamsBindSetterProps> = observer(
  ({ value = [], onChange, style, className, remoteId }) => {
    const prefix = usePrefix('params-bind-setter')
    const { loadPageParameters } = useMeta()
    const [parameters, setParameters] = React.useState<ParamValue[]>([])

    React.useEffect(() => {
      loadPageParameters &&
        loadPageParameters(remoteId).then((data) => setParameters(data || []))
    }, [remoteId, loadPageParameters])

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
          return (
            <ParamBindInput
              key={index}
              dataSource={parameters}
              value={param}
              onChange={(param) => handleParamChange(param, index)}
              remove={() => removeItem(index)}
            />
          )
        })}
        <Button.Group>
          <Button type="dashed" onClick={addParam} block>
            <TextWidget>
              SettingComponents.ParamsBindSetter.addParameter
            </TextWidget>
          </Button>
          <Button type="primary">
            <TextWidget>
              SettingComponents.ParamsBindSetter.smartBind
            </TextWidget>
          </Button>
        </Button.Group>
      </div>
    )
  }
)
