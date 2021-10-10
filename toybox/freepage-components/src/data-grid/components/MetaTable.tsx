import React from 'react'
import { IColumnVisible } from '@toy-box/meta-components/es/components/meta-table/interface'

export const MetaTable = () => null

const Column: React.FC<IColumnVisible> = () => null

MetaTable.displayName = 'DataGrid.MetaTable'

Column.displayName = 'DataGrid.MetaTable.Column'

MetaTable.Column = Column
