import React from 'react'
import { Button, IButtonProps } from '@toy-box/toybox-ui'
import { ArrayBase } from '@formily/antd'
import { useField } from '@formily/react'
import { IconWidget } from '@toy-box/designable-react'

export type ArrayItemRemoveProps = IButtonProps & { title: string }

export const ArrayItemRemove: React.FC<ArrayItemRemoveProps> = (props) => {
  const self = useField()
  const index = ArrayBase.useIndex()
  const array = ArrayBase.useArray()
  if (!array) return null
  if (array.field?.pattern !== 'editable') return null
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (array.props?.disabled) return
        e.stopPropagation()
        array.field?.remove?.(index)
        array.props?.onRemove?.(index)
      }}
      icon={<IconWidget className="anticon" infer="Remove" />}
      block
    >
      {props.title || self.title}
    </Button>
  )
}
