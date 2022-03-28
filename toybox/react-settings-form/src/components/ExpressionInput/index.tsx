import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'antd'
import { observer } from '@formily/react'
import { MetaValueType, IFieldMeta } from '@toy-box/meta-schema'
import { TextWidget, usePrefix } from '@toy-box/designable-react'
import { PowerFxFormulaEditor } from '@toy-box/powerfx-editor'
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
    const prefix = usePrefix('expression-input')
    const [modalVisible, setModalVisible] = useState(false)
    const [innerValue, setInnerValue] = React.useState(value)
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)
    const cancelModal = () => {
      setInnerValue(value)
      setModalVisible(false)
    }
    return (
      <Fragment>
        <Button block onClick={openModal} className={prefix}>
          <div className={prefix + '-icon'}>=</div>
          {value.length > 0 ? (
            <div className={prefix + '-code'}>{value}</div>
          ) : (
            <div className={prefix + '-placeholder'}>
              {
                <TextWidget token="SettingComponents.Expression.configureExpression" />
              }
            </div>
          )}
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
          onCancel={cancelModal}
          onOk={() => {
            onChange(innerValue)
            closeModal()
          }}
        >
          <PowerFxFormulaEditor
            className={cls(prefix, className)}
            style={style}
            defaultValue={innerValue}
            onChange={setInnerValue}
            minLineCount={20}
            maxLineCount={100}
          />
        </Modal>
      </Fragment>
    )
  }
)
