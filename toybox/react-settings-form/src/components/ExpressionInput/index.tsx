import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'antd'
import { observer, useField } from '@formily/react'
import { MetaValueType, IFieldMeta } from '@toy-box/meta-schema'
import { TextWidget, usePrefix, useTreeNode } from '@toy-box/designable-react'
import { ExpressionEditor } from '@toy-box/expression-editor'
import cls from 'classnames'
import './styles.less'

export interface IExpressionInputProps {
  value?: string
  onChange?: (value: string) => void
  valueType: MetaValueType
  className?: string
  style?: React.CSSProperties
  variableMap?: Record<string, IFieldMeta>
}

export const ExpressionInput: React.FC<IExpressionInputProps> = observer(
  (props) => {
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
            <TextWidget token="SettingComponents.Expression.configureExpression" />
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
          <div className={cls(prefix, className)} style={style}>
            <ExpressionEditor
              width="100%"
              height={400}
              value={innerValue}
              onChange={setInnerValue}
              valueType={valueType}
              variableMap={variableMap}
              options={{
                lineNumbers: 'off',
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </Modal>
      </Fragment>
    )
  }
)
