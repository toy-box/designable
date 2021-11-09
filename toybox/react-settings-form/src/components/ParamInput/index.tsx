import React, { useCallback } from 'react'
import { Input, Select } from 'antd'
import { MetaValueType } from '@toy-box/meta-schema'
import { usePrefix, IconWidget } from '@toy-box/designable-react'
import cls from 'classnames'
import './styles.less'

const typeOptions = () => {
  const opts: { label: string; value: string }[] = []
  for (const type in MetaValueType) {
    opts.push({
      label: type,
      value: type,
    })
  }
  return opts
}

export type ParamValueType = MetaValueType

export type ParamValue = {
  key?: string
  name?: string
  type?: ParamValueType
}

export type ParamInputProps = {
  className?: string
  style?: React.CSSProperties
  value?: ParamValue
  onChange?: (value?: ParamValue) => void
  remove?: () => void
}

export const ParamInput: React.FC<ParamInputProps> = ({
  value = {},
  style,
  className,
  onChange,
  remove,
}) => {
  const prefix = usePrefix('param-input')
  const types = typeOptions()

  const handleKeyChange = useCallback(
    (key: string) => {
      onChange && onChange(Object.assign(value, { key }))
    },
    [onChange, value]
  )
  const handleTypeChange = useCallback(
    (type: MetaValueType) => {
      onChange && onChange(Object.assign(value, { type }))
    },
    [onChange, value]
  )

  return (
    <div className={cls(prefix, className)} style={style}>
      <Input.Group compact>
        <Input
          value={value.key}
          onChange={(event) => handleKeyChange(event.target.value)}
          style={{ height: '32px', width: '60%' }}
        />
        <Select
          value={value.type}
          options={types}
          onChange={handleTypeChange}
          style={{ width: '40%' }}
        />
      </Input.Group>
      <IconWidget
        className={`${prefix}__remove`}
        infer="Close"
        onClick={remove}
      />
    </div>
  )
}
