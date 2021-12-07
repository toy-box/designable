import React from 'react'
import { Button } from 'antd'
import { observer } from '@formily/react'
import { useMeta } from '@toy-box/freepage-components'
import { TextWidget, usePrefix } from '@toy-box/designable-react'
import cls from 'classnames'
import { ParamBindInput, ParamBindValue } from '../ParamBindInput'
import { ParamValue } from '../ParamInput'
import { useAttributes } from '../../hooks'
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
    const attributes = useAttributes()

    React.useEffect(() => {
      loadPageParameters &&
        loadPageParameters(remoteId).then((data) => setParameters(data))
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
          const keys = parameters.filter(
            (parameter) =>
              !value.some((v) => v.key === parameter.key) ||
              param === parameter.key
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
