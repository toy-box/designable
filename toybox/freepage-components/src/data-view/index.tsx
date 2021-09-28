import React, { useEffect, useMemo, useState } from 'react'
import { IObjectMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { pick } from '@toy-box/toybox-shared'
import { usePage, usePageParams } from '../page/hooks'

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
}

export const DataView: React.FC<DataViewProps> = observer(
  ({ className, style, schemaOption, children }) => {
    const { loadData, loadMeta, params } = usePage()
    const { metaParams } = usePageParams()
    const field = useField()
    const [schema, setSchema] = useState<IObjectMeta>()

    useEffect(() => {
      if (schemaOption.type === 'objectMeta' && loadMeta) {
        loadMeta(schemaOption?.objectMetaId).then((metaSchema) => {
          setSchema(metaSchema)
        })
      } else if (schemaOption.type === 'schema') {
        setSchema(schemaOption.schemaValue)
      }
    }, [schemaOption, loadMeta])

    useEffect(() => {
      if (metaParams.metaObject) {
        field.form.setValuesIn(field.path, metaParams.metaObject)
      } else if ((schema.key, metaParams.primaryId && loadData)) {
        loadData(schema.key, metaParams.primaryId).then((data) => {
          field.form.setValuesIn(field.path, data)
        })
      }
    }, [schema, metaParams, loadData])

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
