import React from 'react'
import { Spin } from 'antd'
import { useFieldSchema, observer, RecursionField } from '@formily/react'
import { Schema } from '@formily/json-schema'
import {
  DataGrid as ToyboxDataGrid,
  FilterPanel,
  FilterDisplay,
  TableStatusBar,
} from '@toy-box/meta-components'
import { IObjectMeta } from '@toy-box/meta-schema'
import { ToolBar } from '@toy-box/toybox-ui'
import { useMeta } from '../hooks'
import { IColumnVisible } from '@toy-box/meta-components/es/components/meta-table/interface'

export type DataGridProps = {
  className?: string
  style?: React.CSSProperties
  dataSource?: any
  filterFields?: string[]
}

type ComposedDataGrid = React.FC<DataGridProps>

const isMetaTableComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('MetaTable') > -1
}

const isMetaTableColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('MetaTable.Column') > -1
}

const isToobarComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Space') > -1
}

const useLeftToolbarSource = () => {
  const schema = useFieldSchema()
  return schema
    .mapProperties((itemSchema) => itemSchema)
    .find((itemSchema) => isToobarComponent(itemSchema))
}

const useDataGridColumnSource = () => {
  const schema = useFieldSchema()
  const parseSources = (schema: Schema) => {
    if (isMetaTableComponent(schema)) {
      return schema.reduceProperties((buf: IColumnVisible[], schema) => {
        if (isMetaTableColumnComponent(schema)) {
          const { key, ...others } = schema['x-component-props']
          return buf.concat({
            key,
            visiable: true,
            ...others,
          })
        }
        return buf
      }, [])
    }
    return []
  }
  const metaTableSchema = schema
    .mapProperties((itemSchema) => itemSchema)
    .find((itemSchema) => isMetaTableComponent(itemSchema))
  return metaTableSchema ? parseSources(metaTableSchema) : []
}

export const DataGrid: ComposedDataGrid = observer(
  ({ className, style, dataSource, filterFields }) => {
    const { loadMetaDataPageable, loadMetaSchema } = useMeta()
    const [objectMeta, setObjectMeta] = React.useState<IObjectMeta>(undefined)
    const visibleColumns = useDataGridColumnSource()
    const leftToolbarSchema = useLeftToolbarSource()

    React.useEffect(() => {
      loadMetaSchema &&
        loadMetaSchema(dataSource.repository).then((data) => {
          setObjectMeta(data)
        })
    }, [dataSource])

    const loadData = React.useCallback(
      async (pageable, filter) => {
        const data = await loadMetaDataPageable(
          objectMeta?.key,
          pageable,
          filter
        )
        return data
      },
      [objectMeta?.key]
    )

    const fieldMetas = React.useMemo(() => {
      return (filterFields || []).map((fieldKey) => ({
        ...objectMeta?.properties[fieldKey],
      }))
    }, [objectMeta])

    return objectMeta ? (
      <ToyboxDataGrid
        objectMeta={objectMeta}
        visibleColumns={visibleColumns}
        style={style}
        className={className}
        loadData={loadData}
      >
        <ToolBar>
          <FilterPanel fieldMetas={fieldMetas} />
          {leftToolbarSchema && <RecursionField schema={leftToolbarSchema} />}
        </ToolBar>
        <FilterDisplay />
        <TableStatusBar />
      </ToyboxDataGrid>
    ) : (
      <Spin />
    )
  }
)
