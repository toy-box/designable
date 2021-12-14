import React from 'react'
import { Spin } from 'antd'
import {
  useFieldSchema,
  observer,
  RecursionField,
  useField,
  useForm,
} from '@formily/react'
import { Schema } from '@formily/json-schema'
import {
  DataGrid as ToyboxDataGrid,
  DataGridRefType,
} from '@toy-box/meta-components'
import { IObjectMeta } from '@toy-box/meta-schema'
import { ToolBar } from '@toy-box/toybox-ui'
import {
  IColumnVisible,
  RowData,
} from '@toy-box/meta-components/es/components/meta-table/interface'
import { OperateColumn } from './components'
import { SchemaOption } from '../types'
import { useMeta, useFieldActions } from '../hooks'

export type DataGridProps = {
  className?: string
  style?: React.CSSProperties
  metaOption?: SchemaOption
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
    .mapProperties((schema, name) => ({ schema, name }))
    .find((item) => isToobarComponent(item.schema))
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

const useOperate = () => {
  const schema = useFieldSchema()
  const metaTableSchema = schema
    .mapProperties((itemSchema) => itemSchema)
    .find((itemSchema) => isMetaTableComponent(itemSchema))
  const operate = metaTableSchema?.['x-component-props'].operate
  return operate
    ? {
        items: operate.items.map((item) => ({
          text: item.caption,
          type: item.type,
          danger: item.danger,
          size: item.size,
          disabled: item.disabled,
          action: item.action,
        })),
        max: operate.max,
        group: operate.group,
      }
    : undefined
}

export const DataGrid: ComposedDataGrid = observer(
  ({ className, style, metaOption, filterFields }) => {
    const field = useField()
    const ref = React.useRef<DataGridRefType>()
    const { loadMetaDataPageable, loadMetaSchema } = useMeta()
    const [objectMeta, setObjectMeta] = React.useState<IObjectMeta>()
    const visibleColumns = useDataGridColumnSource()
    const leftToolbarSchema = useLeftToolbarSource()
    const tableOperate = useOperate()

    const selectedRows = field.data?.selectedRows || []
    const selectedRowKeys = field.data?.selectedRowKeys || []

    const setSelectedRows = (selectedRows: RowData[]) => {
      // if (field.data != null) {
      //   field.data.selectedRows = selectedRows
      // } else {
      //   field.data = { selectedRows }
      // }
      field.form.setValuesIn(`${field.address}.selectedRows`, selectedRows)
    }

    const setSelectedRowKeys = (selectedRowKeys: string[]) => {
      // if (field.data != null) {
      //   field.data.selectedRowKeys = selectedRowKeys
      // } else {
      //   field.data = { selectedRowKeys }
      // }
      field.form.setValuesIn(
        `${field.address}.selectedRowKeys`,
        selectedRowKeys
      )
    }

    React.useEffect(() => {
      loadMetaSchema &&
        loadMetaSchema(metaOption.repository).then((data) => {
          setObjectMeta(data)
        })
    }, [metaOption])

    const loadData = React.useCallback(
      async (pageable, filter) => {
        const data = await loadMetaDataPageable(
          objectMeta?.key,
          pageable,
          filter
        )
        field.form.setValuesIn(`${field.address}.rows`, data.list)
        // if (field.data) {
        //   field
        //   field.data.rows = data.list
        // } else {
        //   field.data = { rows: data.list }
        // }
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
        ref={ref}
        defaultSelectionType="checkbox"
        objectMeta={objectMeta}
        visibleColumns={visibleColumns}
        style={style}
        className={className}
        loadData={loadData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        tableOperate={tableOperate}
        tableOption={{ operateColumn: OperateColumn }}
      >
        <ToolBar>
          <ToyboxDataGrid.FilterPanel fieldMetas={fieldMetas} />
          {leftToolbarSchema && (
            <RecursionField
              schema={leftToolbarSchema.schema}
              name={leftToolbarSchema.name}
            />
          )}
        </ToolBar>
        <ToyboxDataGrid.FilterDisplay />
        <ToyboxDataGrid.TableStatusBar />
      </ToyboxDataGrid>
    ) : (
      <Spin />
    )
  }
)
