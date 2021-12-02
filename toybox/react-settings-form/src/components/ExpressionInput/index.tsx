import React, { Fragment, useState } from 'react'
import { observer, useField } from '@formily/react'
import { MetaValueType, IFieldMeta } from '@toy-box/meta-schema'
import { TextWidget, usePrefix, useTreeNode } from '@toy-box/designable-react'
import { Modal, Button } from 'antd'
import { MonacoInput } from '../MonacoInput'
import cls from 'classnames'
import './styles.less'

export interface IExpressionInputProps {
  value?: string
  onChange?: (value: string) => void
  valueType: MetaValueType
  className?: string
  style?: React.CSSProperties
  variableMap?: IFieldMeta
}

export const ExpressionInput: React.FC<IExpressionInputProps> = observer((props) => {
  const {
    className,
    style,
    value = '',
    onChange,
    valueType,
    variableMap = {},
  } = props
  const node = useTreeNode()
  const field = useField()
  const prefix = usePrefix('expression-input')
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  const [innerValue, setInnerValue] = React.useState(value)

  return (
    <Fragment>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.Expression.configureExpression" />
      </Button>
      <Modal
        title={
          <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
        }
        width="65%"
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        visible={modalVisible}
        onCancel={closeModal}
        onOk={() => {
          onChange(innerValue)
          closeModal()
        }}
      >
        <div
          className={cls(prefix, className)}
          style={style}
        >
          <MonacoInput
            width="100%"
            height={400}
            language='typescript'
          />
        </div>
      </Modal>
    </Fragment>
  )
})
