import React, { useEffect, useMemo, useState } from 'react'
import { Field } from '@formily/core'
import { IFieldMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { pick } from '@toy-box/toybox-shared'
import { useMeta, usePageParams } from '../hooks'

export type SchemaType = 'schema' | 'entity'

export type SchemaOption = {
  type: SchemaType
  schema?: IFieldMeta
  entityId?: string
}

export type DataValueSourceType =
  | 'paramId'
  | 'paramValue'
  | 'formId'
  | 'formValue'

export type DataValueSource = {
  type: DataValueSourceType
  path: string
}

export type DataViewProps = {
  className?: string
  style?: React.CSSProperties
  primaryValue?: string
  metaOption?: SchemaOption
  dataValueSource?: DataValueSource
}

export type DataViewContextProps = {
  dataValue: any
  field: Field
  metaSchema: IFieldMeta
}

export const DataViewContext = React.createContext<DataViewContextProps>(null)

export const DataView: React.FC<DataViewProps> = observer(
  ({ className, style, metaOption, dataValueSource, children }) => {
    const { loadMetaData, loadMetaSchema } = useMeta()
    const pageParams = usePageParams()
    const field = useField<Field>()
    const [metaSchema, setMetaSchema] = useState<IFieldMeta>()
    const [objectId, setObjectId] = useState<string>()

    useEffect(() => {
      if (metaOption.type === 'entity' && loadMetaSchema) {
        loadMetaSchema(metaOption?.entityId).then((metaSchema) => {
          setMetaSchema(metaSchema)
        })
      } else if (metaOption.type === 'schema') {
        setMetaSchema(metaOption.schema)
      }
    }, [metaOption, loadMetaSchema])

    useEffect(() => {
      switch (dataValueSource.type) {
        case 'paramId':
          setObjectId(pageParams[dataValueSource.path])
          break
        case 'paramValue':
          field.setValue(pageParams[dataValueSource.path])
          setObjectId(undefined)
          break
        case 'formId':
          setObjectId(field.form.getValuesIn(dataValueSource.path))
          break
        case 'formValue':
          field.setValue(field.form.getValuesIn(dataValueSource.path))
          setObjectId(undefined)
          break
        default:
          break
      }
    }, [dataValueSource, pageParams, field])

    useEffect(() => {
      console.warn('effect', metaSchema, objectId)
      if (metaSchema?.key && objectId && loadMetaData) {
        console.warn('loadMetaData', metaSchema.key, objectId)
        loadMetaData(metaSchema.key, objectId).then((data) => {
          field.setValue(data)
        })
      }
    }, [metaSchema, objectId, loadMetaData])

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
