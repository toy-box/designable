import React, { useCallback } from 'react'
import { Input, Select } from 'antd'
import { usePrefix, IconWidget } from '@toy-box/designable-react'
import { MetaValueType } from '@toy-box/meta-schema'
import cls from 'classnames'
import { ExpressionInput } from '../ExpressionInput'
import './styles.less'

export type ParamBindValue = {
  key?: string
  expression?: string
}

export type ParamBindInputProps = {
  className?: string
  style?: React.CSSProperties
  dataSource?: string[]
  paths?: { label: string; value: string }[]
  value?: ParamBindValue
  onChange?: (value?: ParamBindValue) => void
  remove?: () => void
}

export const ParamBindInput: React.FC<ParamBindInputProps> = ({
  dataSource = [],
  paths = [],
  value = {},
  style,
  className,
  onChange,
  remove,
}) => {
  const prefix = usePrefix('param-bind-input')

  const handleKeyChange = useCallback(
    (key: string) => {
      onChange && onChange(Object.assign(value, { key }))
    },
    [onChange, value]
  )
  const handlePathChange = useCallback(
    (path: string) => {
      onChange && onChange(Object.assign(value, { path }))
    },
    [onChange, value]
  )

  return (
    <div className={cls(prefix, className)} style={style}>
      <Input.Group compact>
        <Select
          value={value.key}
          options={dataSource.map((key) => ({ label: key, value: key }))}
          onChange={handleKeyChange}
          style={{ width: '40%' }}
        />
        <div style={{ width: '60%' }}>
          <ExpressionInput
            value={value.expression}
            onChange={handlePathChange}
            valueType={MetaValueType.NUMBER}
            variableMap={{}}
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
