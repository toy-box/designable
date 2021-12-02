import React, { FC } from 'react'
import { MetaColumnContext } from '@toy-box/meta-components'
import { ButtonCluster, ButtonClusterProps } from '../../button-cluster'
import { IBaseOperateColumnProps } from '@toy-box/meta-components/es/components/meta-table/interface'

export const OperateColumn: FC<IBaseOperateColumnProps<ButtonClusterProps>> = ({
  text,
  record,
  index,
  operate,
}) => {
  return (
    <MetaColumnContext.Provider value={{ text, record, index }}>
      <div className="tbox-operate-column">
        <ButtonCluster {...operate} />
      </div>
    </MetaColumnContext.Provider>
  )
}
