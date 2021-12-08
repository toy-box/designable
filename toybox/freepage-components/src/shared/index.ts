import { IFieldMeta, MetaValueType } from '@toy-box/meta-schema'

export const transformToBaseType = (type: MetaValueType | string) => {
  switch (type) {
    case MetaValueType.STRING:
    case MetaValueType.TEXT:
    case MetaValueType.OBJECT_ID:
    case MetaValueType.SINGLE_OPTION:
      return MetaValueType.STRING
    case MetaValueType.INTEGER:
    case MetaValueType.NUMBER:
    case MetaValueType.TIMESTAMP:
    case MetaValueType.RATE:
    case MetaValueType.PERCENT:
      return MetaValueType.NUMBER
    case MetaValueType.DATE:
    case MetaValueType.DATETIME:
      return MetaValueType.DATETIME
    case MetaValueType.BOOLEAN:
      return MetaValueType.BOOLEAN
    case MetaValueType.MULTI_OPTION:
      return MetaValueType.ARRAY
    case MetaValueType.OBJECT:
      return MetaValueType.OBJECT
    default:
      return MetaValueType.STRING
  }
}

export const transformFieldMetaToParameters = (fieldMeta: IFieldMeta) => {
  if (fieldMeta.type === MetaValueType.OBJECT) {
    return Object.keys(fieldMeta.properties).map((key) => ({
      key,
      name: fieldMeta.properties[key].name,
      type: transformToBaseType(fieldMeta.properties[key].type),
    }))
  }
}
