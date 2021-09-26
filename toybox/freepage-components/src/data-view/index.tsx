import React, { useEffect, useMemo, useState } from 'react'
import { IObjectMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { isStr, pick } from '@toy-box/toybox-shared'

export type SchemaType = 'schema' | 'objectMeta'

export type SchemaOption = {
  type: SchemaType
  schemaValue?: IObjectMeta
  objectMetaId?: string
}

export type DataViewProps = {
  className?: string
  style?: React.CSSProperties
  primaryValue?: string
  schemaOption?: SchemaOption
  loadData?: (id: string) => Promise<any>
  loadMeta?: (metaId: string) => Promise<IObjectMeta>
}

export const DataView: React.FC<DataViewProps> = observer(
  ({
    className,
    style,
    primaryValue,
    schemaOption,
    loadData,
    loadMeta,
    children,
  }) => {
    const field = useField()
    const [schema, setSchema] = useState<IObjectMeta>()

    useEffect(() => {
      if (schemaOption.type === 'objectMeta' && loadMeta) {
        loadMeta(schemaOption.objectMetaId).then((metaSchema) => {
          setSchema(metaSchema)
        })
      } else if (schemaOption.type === 'schema') {
        setSchema(schemaOption.schemaValue)
      }
    }, [])

    useEffect(() => {
      if (primaryValue && loadData) {
        loadData(primaryValue).then((data) => {
          field.form.setValuesIn(field.path, data)
        })
      }
    }, [primaryValue])

    const dataValue = useMemo(() => {
      pick(field.form.getValuesIn(field.path), Object.keys(schema.properties))
    }, [field, schema])

    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
)
