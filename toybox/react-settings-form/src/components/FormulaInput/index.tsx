import React from 'react'
import { InputProps } from 'antd/lib/input'
import { Input } from 'antd'
import { usePrefix } from '@designable/react'
import cls from 'classnames'

export interface FormulaInputProps extends Omit<InputProps, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
}

export const FormulaInput: React.FC<FormulaInputProps> = ({
  className,
  style,
  ...props
}) => {
  const prefix = usePrefix('formula-input')
  return (
    <div className={cls(prefix, className)} style={style}>
      <Input
        {...props}
        onChange={(e) => {
          props.onChange?.(e?.target?.['value'])
        }}
      />
    </div>
  )
}
