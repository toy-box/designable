import React from 'react'
import { useFieldSchema, observer } from '@formily/react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { FormGrid as FormilyGird } from '@formily/antd'
import cls from 'classnames'

export type ContainerProps = {
  className?: string
  style?: React.CSSProperties
}

export const Container: React.FC<ContainerProps> = observer((props) => {
  const schema = useFieldSchema()
  const totalColumns = schema
    .mapProperties((itemSchema) => itemSchema)
    .reduce(
      (buf, itemSchema: any) =>
        buf + (itemSchema?.['x-component-props']?.gridSpan ?? 1),
      0
    )
  // debugger
  return (
    <div className="dn-grid">
      <FormilyGird {...props} key={totalColumns}>
        {schema.mapProperties((itemSchema) => (
          <FormilyGird.GridColumn {...itemSchema}>
            {itemSchema?.properties && props.children}
          </FormilyGird.GridColumn>
        ))}
      </FormilyGird>
    </div>
  )
})

FormilyGird.GridColumn = observer((props: any) => {
  return (
    <div
      {...props}
      className={cls(props['className'], {})}
      data-span={props?.['x-component-props'].gridSpan}
      style={{
        ...props['style'],
        gridColumnStart: `span ${props?.['x-component-props'].gridSpan || 1}`,
      }}
    ></div>
  )
})
