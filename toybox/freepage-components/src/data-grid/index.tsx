import React from 'react'
import { MetaTable } from '@toy-box/meta-components'
import { useMeta } from '../hooks'

export type DataGridProps = {
  className?: string
  style?: React.CSSProperties
  repositoryId?: string
}

export const DataGrid: React.FC<DataGridProps> = ({
  className,
  style,
  repositoryId,
}) => {
  const { loadMataData, loadMetaSchema } = useMeta()

  return <div className={className} style={style}></div>
}
