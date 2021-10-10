import React from 'react'
import { Spin } from 'antd'
import {
  DataGrid as ToyboxDataGrid,
  FilterPanel,
  FilterDisplay,
  TableStatusBar,
} from '@toy-box/meta-components'
import { IObjectMeta } from '@toy-box/meta-schema'
import { ToolBar } from '@toy-box/toybox-ui'
import { MetaTable } from './components'
import { convertChildrenToData, toArray } from './convert'
import { useMeta } from '../hooks'

export type DataGridProps = {
  className?: string
  style?: React.CSSProperties
  dataSource?: any
  filterFields?: string[]
}

export const DataGrid: React.FC<DataGridProps> & { MetaTable: React.FC } = ({
  className,
  style,
  dataSource,
  filterFields,
  children,
}) => {
  const { loadMetaDataList, loadMetaSchema } = useMeta()
  const [objectMeta, setObjectMeta] = React.useState<IObjectMeta>(undefined)
  const metaTable = React.useMemo(
    () =>
      toArray(children).find(
        (child: React.ReactElement) =>
          React.isValidElement(child) &&
          child['displayName'] === 'DataGrid.MetaTable'
      ),
    [children]
  )
  const visibleColumns = React.useMemo(
    () =>
      React.isValidElement(metaTable)
        ? convertChildrenToData(metaTable.props.children)
        : [],
    [metaTable]
  )

  React.useEffect(() => {
    loadMetaSchema &&
      loadMetaSchema(dataSource.repository).then((data) => {
        setObjectMeta(data)
      })
  }, [dataSource])

  const loadData = React.useCallback(
    (pageable, filter) => {
      return loadMetaDataList(objectMeta?.key, pageable, filter)
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
      </ToolBar>
      <FilterDisplay />
      <TableStatusBar />
    </ToyboxDataGrid>
  ) : (
    <Spin />
  )
}

DataGrid.displayName = 'DataGrid'

DataGrid.MetaTable = MetaTable
