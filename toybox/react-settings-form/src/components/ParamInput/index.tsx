import React, { useCallback } from 'react'
import { Input, Select } from 'antd'
import { MetaValueType } from '@toy-box/meta-schema'
import { IBaseParameter } from '@toy-box/freepage-components'
import { usePrefix, IconWidget } from '@toy-box/designable-react'
import cls from 'classnames'
import './styles.less'

const typeOptions = () => {
  const baseTypes = [
    MetaValueType.NUMBER,
    MetaValueType.STRING,
    MetaValueType.BOOLEAN,
    MetaValueType.DATETIME,
    MetaValueType.OBJECT,
    MetaValueType.ARRAY,
  ]
  return baseTypes.map((type) => ({
    label: `${type.substr(0, 1).toLowerCase()}${type.substring(1)}`,
    value: type,
  }))
}

export type ParamValueType = MetaValueType

export type ParamValue = Partial<IBaseParameter>

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
  const metaTypes = typeOptions()

  const handleKeyChange = useCallback(
    (key: string) => {
      onChange && onChange({ ...value, key })
    },
    [onChange, value]
  )
  const handleTypeChange = useCallback(
    (type: MetaValueType) => {
      onChange && onChange({ ...value, type })
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
          options={metaTypes}
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
