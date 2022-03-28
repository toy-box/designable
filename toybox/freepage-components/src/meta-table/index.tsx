import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react'
import { Table, Pagination, Space, Select, Badge } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { SelectProps } from 'antd/lib/select'
import cls from 'classnames'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import {
  GeneralField,
  FieldDisplayTypes,
  ArrayField,
  Field,
} from '@formily/core'
import {
  useField,
  useForm,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { isArr, isBool } from '@formily/shared'
import { Schema } from '@formily/json-schema'
import { ArrayBase, ArrayBaseMixins } from '@formily/antd'
import { usePrefixCls } from '@formily/antd/lib/__builtins__'
import { IObjectMeta } from '@toy-box/meta-schema'
import { RowSelectionType } from 'antd/lib/table/interface'
import { RowData } from '@toy-box/meta-components/lib/components/meta-table/interface'

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps<any>
  schema: Schema
  display: FieldDisplayTypes
  name: string
}
interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[]
  children?: (
    dataSource: any[],
    pagination: React.ReactNode
  ) => React.ReactElement
}

interface IStatusSelectProps extends SelectProps<any> {
  pageSize?: number
}

type ComposedArrayTable = React.FC<TableProps<any>> &
  ArrayBaseMixins & {
    Column?: React.FC<ColumnProps<any>>
  }

const SortableRow = SortableElement((props: any) => <tr {...props} />)
const SortableBody = SortableContainer((props: any) => <tbody {...props} />)

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const useSelectedKeys = (): [string[], (keys?: string[]) => void] => {
  const field = useField()
  const { form } = field
  const path = field.path.concat('selectedKeys')
  return [
    form.getValuesIn(path),
    (keys: string[]) => form.setValuesIn(path, keys),
  ]
}

const useArrayTableSources = () => {
  const metaTableField = useField()
  const schema = useFieldSchema()
  const dataSourceSchema = schema?.properties?.['dataSource']

  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = metaTableField
        .query(metaTableField.address.concat('dataSource', name))
        .take()
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schema || !dataSourceSchema)
    throw new Error('can not found schema object')

  return parseArrayItems(dataSourceSchema.items)
}

const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
      render: (value: any, record: any) => {
        const index = dataSource.indexOf(record)
        const children = (
          <ArrayBase.Item index={index} record={record}>
            <RecursionField schema={schema} name={index} onlyRenderProperties />
          </ArrayBase.Item>
        )
        return children
      },
    })
  }, [])
}

const useAddition = () => {
  const schema = useFieldSchema()
  return schema.reduceProperties((addition, schema, key) => {
    if (isAdditionComponent(schema)) {
      return <RecursionField schema={schema} name={key} />
    }
    return addition
  }, null)
}

const schedulerRequest = {
  request: null,
}

const StatusSelect: React.FC<IStatusSelectProps> = observer(
  (props) => {
    const field = useField<ArrayField>()
    const prefixCls = usePrefixCls('formily-array-table')
    const errors = field.errors
    const parseIndex = (address: string) => {
      return Number(
        address
          .slice(address.indexOf(field.address.toString()) + 1)
          .match(/(\d+)/)?.[1]
      )
    }
    const options = props.options?.map(({ label, value }) => {
      const hasError = errors.some(({ address }) => {
        const currentIndex = parseIndex(address)
        const startIndex = (value - 1) * props.pageSize
        const endIndex = value * props.pageSize
        return currentIndex >= startIndex && currentIndex <= endIndex
      })
      return {
        label: hasError ? <Badge dot>{label}</Badge> : label,
        value,
      }
    })

    const width = String(options?.length).length * 15

    return (
      <Select
        value={props.value}
        onChange={props.onChange}
        options={options}
        virtual
        style={{
          width: width < 60 ? 60 : width,
        }}
        className={cls(`${prefixCls}-status-select`, {
          'has-error': errors?.length,
        })}
      />
    )
  },
  {
    scheduler: (update) => {
      clearTimeout(schedulerRequest.request)
      schedulerRequest.request = setTimeout(() => {
        update()
      }, 100)
    },
  }
)

const ArrayTablePagination: React.FC<IArrayTablePaginationProps> = (props) => {
  const [current, setCurrent] = useState(1)
  const prefixCls = usePrefixCls('formily-array-table')
  const pageSize = props.pageSize || 10
  const size = props.size || 'default'
  const dataSource = props.dataSource || []
  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize - 1
  const total = dataSource?.length || 0
  const totalPage = Math.ceil(total / pageSize)
  const pages = Array.from(new Array(totalPage)).map((_, index) => {
    const page = index + 1
    return {
      label: page,
      value: page,
    }
  })
  const handleChange = (current: number) => {
    setCurrent(current)
  }

  useEffect(() => {
    if (totalPage > 0 && totalPage < current) {
      handleChange(totalPage)
    }
  }, [totalPage, current])

  const renderPagination = () => {
    if (totalPage <= 1) return
    return (
      <div className={`${prefixCls}-pagination`}>
        <Space>
          <StatusSelect
            value={current}
            pageSize={pageSize}
            onChange={handleChange}
            options={pages}
            notFoundContent={false}
          />
          <Pagination
            {...props}
            pageSize={pageSize}
            current={current}
            total={dataSource.length}
            size={size}
            showSizeChanger={false}
            onChange={handleChange}
          />
        </Space>
      </div>
    )
  }

  return (
    <Fragment>
      {props.children?.(
        dataSource?.slice(startIndex, endIndex + 1),
        renderPagination()
      )}
    </Fragment>
  )
}

const RowComp = (props: any) => {
  return <SortableRow index={props['data-row-key'] || 0} {...props} />
}

export interface MetaTableProps<T> extends TableProps<T> {
  objectMeta: IObjectMeta
  defaultSelectionType?: RowSelectionType
  keepSelected?: boolean
}

export const MetaTable: ComposedArrayTable = observer(
  (props: MetaTableProps<any>) => {
    const { objectMeta, ...tableProps } = props
    const ref = useRef<HTMLDivElement>()
    const field = useField<Field>()
    const form = useForm()
    const tableField = form.fields[
      field.address.concat('dataSource').toString()
    ] as ArrayField
    const prefixCls = usePrefixCls('formily-array-table')
    const dataSource = Array.isArray(field.value?.['dataSource'])
      ? field.value?.['dataSource'].slice()
      : []
    const sources = useArrayTableSources()
    const columns = useArrayTableColumns(dataSource, sources)
    const pagination = isBool(props.pagination) ? {} : props.pagination
    const addition = useAddition()
    const defaultRowKey = (record: any) => {
      return dataSource.indexOf(record)
    }
    const [selectedKeys, setSelectedKeys] = useSelectedKeys()

    const rowSelection = useMemo(
      () =>
        props.defaultSelectionType != null
          ? {
              type: props.defaultSelectionType,
              selectedKeys,
              onChange: (keys: string[], rows: RowData[]) => {
                if (props.keepSelected) {
                  setSelectedKeys(
                    selectedKeys
                      .filter(
                        (key) =>
                          !tableProps.dataSource.some(
                            (row) => row[objectMeta.primaryKey || 'id'] === key
                          )
                      )
                      .concat(...keys)
                  )
                } else {
                  setSelectedKeys(keys)
                }
              },
            }
          : undefined,
      [selectedKeys, setSelectedKeys, tableProps.dataSource]
    )

    const addTdStyles = (node: HTMLElement) => {
      const helper = document.body.querySelector(`.${prefixCls}-sort-helper`)
      if (helper) {
        const tds = node.querySelectorAll('td')
        requestAnimationFrame(() => {
          helper.querySelectorAll('td').forEach((td, index) => {
            if (tds[index]) {
              td.style.width = getComputedStyle(tds[index]).width
            }
          })
        })
      }
    }

    return (
      <ArrayTablePagination {...pagination} dataSource={dataSource}>
        {(dataSource, pager) => (
          <div ref={ref} className={prefixCls}>
            <ArrayBase>
              <Table
                size="small"
                bordered
                rowKey={defaultRowKey}
                {...tableProps}
                rowSelection={rowSelection}
                onChange={() => {}}
                pagination={false}
                columns={columns}
                dataSource={dataSource}
                components={{
                  body: {
                    wrapper: (props: any) => (
                      <SortableBody
                        useDragHandle
                        lockAxis="y"
                        helperClass={`${prefixCls}-sort-helper`}
                        helperContainer={() => {
                          return ref.current?.querySelector('tbody')
                        }}
                        onSortStart={({ node }) => {
                          addTdStyles(node)
                        }}
                        onSortEnd={({ oldIndex, newIndex }) => {
                          tableField.move(oldIndex, newIndex)
                        }}
                        {...props}
                      />
                    ),
                    row: RowComp,
                  },
                }}
              />
              <div style={{ marginTop: 5, marginBottom: 5 }}>{pager}</div>
              {sources.map((column, key) => {
                //专门用来承接对Column的状态管理
                if (!isColumnComponent(column.schema)) return
                return React.createElement(RecursionField, {
                  name: column.name,
                  schema: column.schema,
                  onlyRenderSelf: true,
                  key,
                })
              })}
              {addition}
            </ArrayBase>
          </div>
        )}
      </ArrayTablePagination>
    )
  }
)

MetaTable.displayName = 'MetaTable'

MetaTable.Column = () => {
  return <Fragment />
}

ArrayBase.mixin(MetaTable)

export default MetaTable
