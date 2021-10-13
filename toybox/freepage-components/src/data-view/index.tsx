import React, { useEffect, useMemo, useState } from 'react'
import { Field } from '@formily/core'
import { IFieldMeta, IObjectMeta } from '@toy-box/meta-schema'
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

export type DataViewContextProps = {
  dataValue: any
  field: Field
  metaSchema: IFieldMeta
}

export const DataViewContext = React.createContext<DataViewContextProps>(null)

export const DataView: React.FC<DataViewProps> = observer(
  ({ className, style, schemaOption, children }) => {
    const { loadMataData, loadMetaSchema } = useMeta()
    const { metaParams } = usePageParams()
    const field = useField()
    const [metaSchema, setMetaSchema] = useState<IObjectMeta>()

    useEffect(() => {
      if (schemaOption.type === 'repository' && loadMetaSchema) {
        loadMetaSchema(schemaOption?.repositoryId).then((metaSchema) => {
          setMetaSchema(metaSchema)
        })
      } else if (schemaOption.type === 'raw') {
        setMetaSchema(schemaOption.schemaValue)
      }
    }, [schemaOption, loadMetaSchema])

    useEffect(() => {
      if (metaParams.metaObject) {
        field.form.setValuesIn(field.path, metaParams.metaObject)
      } else if ((metaSchema.key, metaParams.primaryValue && loadMataData)) {
        loadMataData(metaSchema.key, metaParams.primaryValue).then((data) => {
          field.form.setValuesIn(field.path, data)
        })
      }
    }, [metaSchema, metaParams, loadMataData])

    const dataValue = useMemo(() => {
      pick(
        field.form.getValuesIn(field.path),
        Object.keys(metaSchema?.properties || {})
      )
    }, [field, metaSchema])

    return (
      <DataViewContext.Provider
        value={{
          dataValue,
          field,
          metaSchema,
        }}
      >
        <div className={className} style={style}>
          {children}
        </div>
      </DataViewContext.Provider>
    )
  }
)
