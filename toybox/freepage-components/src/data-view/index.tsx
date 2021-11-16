import React, { useEffect, useMemo, useState } from 'react'
import { Field } from '@formily/core'
import { IFieldMeta } from '@toy-box/meta-schema'
import { observer, useField } from '@formily/react'
import { pick } from '@toy-box/toybox-shared'
import { SchemaOption } from '../types'
import { useMeta, usePageParams } from '../hooks'

export enum DataValueSourceType {
  ParamId = 'paramId', // Get Record ID from param
  ParamValue = 'paramValue', // Get Record data from param
  FormId = 'formId', // Get Recrod ID from form
  FormValue = 'formValue', // Get Recrod data from form
}

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
      if (metaOption.type === 'repository' && loadMetaSchema) {
        loadMetaSchema(metaOption?.repository).then((metaSchema) => {
          setMetaSchema(metaSchema)
        })
      } else if (metaOption.type === 'schema') {
        setMetaSchema(metaOption.schema)
      }
    }, [metaOption, loadMetaSchema])

    useEffect(() => {
      switch (dataValueSource.type) {
        case DataValueSourceType.ParamId:
          setObjectId(pageParams[dataValueSource.path])
          break
        case DataValueSourceType.ParamValue:
          field.setValue(pageParams[dataValueSource.path])
          setObjectId(undefined)
          break
        case DataValueSourceType.FormId:
          setObjectId(field.form.getValuesIn(dataValueSource.path))
          break
        case DataValueSourceType.FormValue:
          field.setValue(field.form.getValuesIn(dataValueSource.path))
          setObjectId(undefined)
          break
        default:
          break
      }
    }, [dataValueSource, pageParams, field])

    useEffect(() => {
      if (metaSchema?.key && objectId && loadMetaData) {
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
