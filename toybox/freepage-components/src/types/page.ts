import { IFieldMeta } from '@toy-box/meta-schema'

export enum PageParameterPattern {
  BaseType = 'baseType',
  MetaSchema = 'MetaSchema',
  MetaObject = 'MetaObject',
}

export interface PageParameter {
  paramKey: string
  name?: string
  pattern: PageParameterPattern
  baseType?: string
  metaSchema?: IFieldMeta
  metaObject?: string
}
