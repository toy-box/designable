import React, { useEffect, useMemo, useState } from 'react'
import { IObjectMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { pick } from '@toy-box/toybox-shared'
import { useMeta, usePageParams } from '../hooks'

export type SchemaType = 'raw' | 'repository'

export type SchemaOption = {
  type: SchemaType
  schemaValue?: IObjectMeta
  repositoryId?: string
}

export type DataViewProps = {
  className?: string
  style?: React.CSSProperties
  primaryValue?: string
  schemaOption?: SchemaOption
}

export const DataView: React.FC<DataViewProps> = observer(
  ({ className, style, schemaOption, children }) => {
    const { loadMataData, loadMetaSchema } = useMeta()
    const { metaParams } = usePageParams()
    const field = useField()
    const [schema, setSchema] = useState<IObjectMeta>()

    useEffect(() => {
      if (schemaOption.type === 'repository' && loadMetaSchema) {
        loadMetaSchema(schemaOption?.repositoryId).then((metaSchema) => {
          setSchema(metaSchema)
        })
      } else if (schemaOption.type === 'raw') {
        setSchema(schemaOption.schemaValue)
      }
    }, [schemaOption, loadMetaSchema])

    useEffect(() => {
      if (metaParams.metaObject) {
        field.form.setValuesIn(field.path, metaParams.metaObject)
      } else if ((schema.key, metaParams.primaryValue && loadMataData)) {
        loadMataData(schema.key, metaParams.primaryValue).then((data) => {
          field.form.setValuesIn(field.path, data)
        })
      }
    }, [schema, metaParams, loadMataData])

    const dataValue = useMemo(() => {
      pick(
        field.form.getValuesIn(field.path),
        Object.keys(schema?.properties || {})
      )
    }, [field, schema])

    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
)
