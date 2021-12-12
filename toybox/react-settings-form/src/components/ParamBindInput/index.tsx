import React, { useCallback, useMemo } from 'react'
import { Input, Select } from 'antd'
import { usePrefix, IconWidget } from '@toy-box/designable-react'
import cls from 'classnames'
import { useVariableMap } from './hooks'
import { ExpressionInput } from '../ExpressionInput'
import { ParamValue } from '../ParamInput'
import './styles.less'

export type ParamBindValue = {
  key?: string
  expression?: string
}

export type ParamBindInputProps = {
  className?: string
  style?: React.CSSProperties
  dataSource?: ParamValue[]
  value?: ParamBindValue
  onChange?: (value?: ParamBindValue) => void
  remove?: () => void
}

export const ParamBindInput: React.FC<ParamBindInputProps> = ({
  dataSource = [],
  value = {},
  style,
  className,
  onChange,
  remove,
}) => {
  const prefix = usePrefix('param-bind-input')
  const variableMap = useVariableMap()
  const handleKeyChange = useCallback(
    (key: string) => {
      onChange &&
        onChange({
          ...value,
          key,
        })
    },
    [onChange, value]
  )

  const handlePathChange = useCallback(
    (expression: string) => {
      onChange &&
        onChange({
          ...value,
          expression,
        })
    },
    [onChange, value]
  )

  const bindParam = useMemo(
    () => dataSource.find((param) => param.key === value),
    []
  )

  return (
    <div className={cls(prefix, className)} style={style}>
      <Input.Group compact>
        <Select
          value={value.key}
          options={dataSource.map((param) => ({
            label: param.key,
            value: param.key,
          }))}
          onChange={handleKeyChange}
          style={{ width: '40%' }}
        />
        <div style={{ width: '60%' }}>
          <ExpressionInput
            value={value.expression}
            onChange={handlePathChange}
            valueType={bindParam?.type}
            variableMap={variableMap}
          />
        </div>
      </Input.Group>
      <IconWidget
        className={`${prefix}__remove`}
        infer="Close"
        onClick={remove}
      />
    </div>
  )
}
