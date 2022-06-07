import React from 'react'
import { useFieldSchema, observer } from '@formily/react'
import { FormGrid as FormilyGird } from '@formily/antd'
import cls from 'classnames'

export type ContainerProps = {
  className?: string
  style?: React.CSSProperties
}

type formilyGrid = typeof FormilyGird

export const Container: React.FC<ContainerProps> & {
  ContainerColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>
} = (props) => {
  const schema = useFieldSchema()
  const totalColumns = schema
    ?.mapProperties((itemSchema) => itemSchema)
    .reduce(
      (buf, itemSchema: any) =>
        buf + (itemSchema?.['x-component-props']?.gridSpan ?? 1),
      0
    )
  return (
    <div className="dn-grid">
      <FormilyGird {...props} key={totalColumns}>
        {props.children}
      </FormilyGird>
    </div>
  )
}

Container.ContainerColumn = observer((props) => {
  return (
    <div
      {...props}
      className={cls(props['className'], {
        'dn-grid-column': !props.children,
      })}
      data-span={props.gridSpan}
      style={{
        ...props['style'],
        gridColumnStart: `span ${props.gridSpan || 1}`,
      }}
    >
      {props.children}
    </div>
  )
})
