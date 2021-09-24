import React, { useCallback, useMemo, useState } from 'react'
import { Select } from 'antd'
import { observer, useField } from '@formily/react'
import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'
import { useScope } from '../../hooks'

export interface IFieldBindSetterProps {
  value?: any
  onChange?: (value: any) => void
}

export const FieldBindSetter: React.FC<IFieldBindSetterProps> = observer(
  ({ value, onChange }) => {
    const field = useField()
    const [metaSchema, setMetaSchema] = useState<IFieldMeta>({
      type: 'object',
      key: 'user',
      name: '用户',
      properties: {
        name: {
          key: 'name',
          name: '姓名',
          type: 'string',
        },
        email: {
          key: 'email',
          name: '邮件',
          type: 'string',
        },
        birthday: {
          key: 'birthday',
          name: '出生日期',
          type: 'date',
        },
        gender: {
          key: 'gender',
          name: '性别',
          type: 'singleOption',
          options: [
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ],
        },
        info: {
          key: 'info',
          name: '相关信息',
          type: 'object',
          properties: {
            father: {
              key: 'fater',
              type: 'string',
              name: '父亲',
            },
            mother: {
              key: 'mother',
              type: 'string',
              name: '母亲',
            },
          },
        },
      },
    })
    const { node } = useScope()
    const dataView = useMemo(
      () =>
        node
          .getParents()
          .find((node) => node.props['x-component'] === 'DataView'),
      [node]
    )
    const dataParent = useMemo(
      () =>
        node
          .getParents()
          .find(
            (node) =>
              node.props.type === 'array' || node.props.type === 'object'
          ),
      []
    )
    const attributes = useMemo(() => {
      if (dataView == null) {
        return []
      }
      if (dataParent == null || dataParent === dataView) {
        return Object.keys(metaSchema.properties)
          .map((key) => metaSchema.properties[key])
          .filter((field) => fitField(field, node))
          .map((field) => ({
            value: field.key,
            label: field.name,
          }))
      }
      const path = node
        .getParents()
        .filter(
          (node) => node.depth > dataView.depth && node.props.type !== 'void'
        )
        .map((node) => node.props.name)
      const meta = fetchMeta(path, metaSchema) || {}
      return Object.keys(meta.properties)
        .map((key) => meta.properties[key])
        .filter((field) => fitField(field, node))
        .map((field) => ({
          value: field.key,
          label: field.name,
        }))
    }, [dataView, dataParent, metaSchema])

    const handleChange = useCallback(
      (value) => {
        onChange && onChange(value)
        field.form.setValuesIn(
          'title',
          attributes.find((attr) => attr.value === value)?.label
        )
        field.form.setValuesIn('name', value)
      },
      [onChange, field]
    )

    return (
      <Select
        options={attributes}
        disabled={dataView == null}
        value={value}
        onChange={handleChange}
      />
    )
  }
)

export const fetchMeta = (path: string[], meta: IFieldMeta) => {
  if (path == null || path.length === 0 || meta == null) {
    return meta
  }
  const currentMeta =
    meta.type === 'object'
      ? meta.properties[path[0]]
      : meta.type === 'array'
      ? meta.items.properties[path[0]]
      : null

  return fetchMeta(path.slice(1), currentMeta)
}

const fitField = (field: IFieldMeta, node) => {
  if (node.props.type === 'object') {
    return field.type === MetaValueType.OBJECT
  }
  return ComponentFit[node.props['x-component']].some(
    (type) => type === field.type
  )
}

const ComponentFit: Record<string, MetaValueType[]> = {
  Input: [MetaValueType.STRING],
  TextArea: [MetaValueType.STRING, MetaValueType.TEXT],
  NumberPicker: [MetaValueType.INTEGER, MetaValueType.NUMBER],
  Switch: [MetaValueType.BOOLEAN],
  Select: [MetaValueType.SINGLE_OPTION],
  ObjectContainer: [MetaValueType.OBJECT],
  DatePicker: [MetaValueType.DATE, MetaValueType.DATETIME],
}
