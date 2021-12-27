import { ISchema, Schema } from '@formily/json-schema'
import { ITreeNode, TreeNode } from '@designable/core'
import { clone, uid, omit, isObj } from '@toy-box/toybox-shared'
import { IFieldMeta } from '@toy-box/meta-schema'
import {
  IPageBase,
  IMetaSchemaOption,
  ItemEditability,
  ItemVisibility,
} from '@toy-box/freepage-core'

const PAGE_SCHEMA = {
  type: 'void',
  properties: {},
}
export interface ITransformerOptions {
  designableFieldName?: string
  designableFormName?: string
}

export interface IPageSchema {
  schema?: ISchema
  page?: IPageBase
}

const createOptions = (options: ITransformerOptions): ITransformerOptions => {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Page',
    ...options,
  }
}

export const transformToSchema = async (
  node: TreeNode,
  options?: ITransformerOptions,
  metaSchemaOption?: IMetaSchemaOption,
  addonProperties?: Record<string, ISchema>
): Promise<IPageSchema> => {
  const { loadMetaSchema } = metaSchemaOption
  const realOptions = createOptions(options)
  const root = node.find((child) => {
    return child.componentName === realOptions.designableFormName
  })
  const schema = PAGE_SCHEMA
  if (!root) return { schema }
  const createSchema = async (
    node: TreeNode,
    schema: ISchema = {},
    addonProperties?: Record<string, ISchema>
  ) => {
    const field = node.props.field
    if (node !== root) {
      Object.assign(
        schema,
        clone(omit(node.props, ['visibility', 'editability', 'field']))
      )
    }
    schema['x-designable-id'] = node.id
    if (schema.type === 'array') {
      if (node.children[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName
        ) {
          schema.items = await createSchema(node.children[0])
          schema['x-index'] = 0
        }
      }
      node.children.slice(1).forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return
        const key = child.props.name || child.id
        schema.properties = schema.properties || {}
        schema.properties[key] = createSchema(child)
        schema.properties[key]['x-index'] = index
      })
    } else if (node.children && node.children.length > 0) {
      for (let index = 0; index < node.children.length; index++) {
        const child = node.children[index]
        if (child.componentName !== realOptions.designableFieldName) return
        const key = child.props.name || child.id
        schema.properties = schema.properties || {}
        schema.properties[key] = await createSchema(child)
        schema.properties[key]['x-index'] = index
      }
    }
    const dataView = node
      .getParents()
      .find((node) => node.props['x-component'] === 'DataView')

    if (dataView) {
      const path = node
        .getParents()
        .filter(
          (node) => node.depth > dataView.depth && node.props.type !== 'void'
        )
        .map((node) => node.props.name)
      path.push(field)
      // TODO: 修改 objectMeta获取的方式
      const metaOption = dataView.props?.['x-component-props']?.metaOption
      let metaSchema: IFieldMeta
      if (metaOption?.type === 'repository' && loadMetaSchema) {
        metaSchema = await loadMetaSchema(metaOption.repository)
      } else if (metaOption?.type === 'schema') {
        metaSchema = metaOption.schema
      }
      schema['x-component-props'] = schema['x-component-props'] || {}
      schema['x-component-props'].field = fetchMeta(path, metaSchema) || {}
    } else {
      schema['x-component-props'] = schema['x-component-props'] || {}
      schema['x-component-props'].field = {}
    }
    if (node.props.visibility) {
      const visibilityReaction = transformVisibility(node.props.visibility)
      const reactions = schema['x-reactions']
      if (visibilityReaction) {
        if (reactions == null) {
          schema['x-reactions'] = [visibilityReaction]
        } else {
          schema['x-reactions'] = Array.isArray(schema['x-reactions'])
            ? [...schema['x-reactions'], visibilityReaction]
            : [schema['x-reactions'], visibilityReaction]
        }
      }
    }
    if (node.props.editability) {
      const editabilityReaction = transformEditability(node.props.editability)
      const reactions = schema['x-reactions']
      if (editabilityReaction) {
        if (reactions == null) {
          schema['x-reactions'] = [editabilityReaction]
        } else {
          schema['x-reactions'] = Array.isArray(schema['x-reactions'])
            ? [...schema['x-reactions'], editabilityReaction]
            : [schema['x-reactions'], editabilityReaction]
        }
      }
    }
    if (isObj(addonProperties)) {
      Object.assign(schema.properties, addonProperties)
    }
    return schema
  }
  return {
    page: clone(root.props),
    schema: await createSchema(root, schema, addonProperties),
  }
}

export const transformRootToSchema = (props: Record<string, any>) => {
  return
}

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

export const transformToTreeNode = (
  page: IPageSchema = {},
  options?: ITransformerOptions
) => {
  const realOptions = createOptions(options)
  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: page.page,
    children: [],
  }
  const schema = new Schema(page.schema)
  const cleanProps = (props: any) => {
    if (props['name'] === props['x-designable-id']) {
      delete props.name
    }
    delete props['version']
    delete props['_isJSONSchemaObject']
    return props
  }
  const appendTreeNode = (parent: ITreeNode, schema: Schema) => {
    if (!schema) return
    const current = {
      id: schema['x-designable-id'] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanProps(schema.toJSON(false)),
      children: [],
    }
    parent.children.push(current)
    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items)
    }
    schema.mapProperties((schema) => {
      schema['x-designable-id'] = schema['x-designable-id'] || uid()
      appendTreeNode(current, schema)
    })
  }
  schema.mapProperties((schema) => {
    schema['x-designable-id'] = schema['x-designable-id'] || uid()
    appendTreeNode(root, schema)
  })
  return root
}

export const transformEditability = (editability: ItemEditability) => {
  switch (editability.type) {
    case 'expression':
      return {
        type: 'expression',
        state: 'editability',
        expression: editability.expression,
      }
    case 'conditional':
      return {
        type: 'conditional',
        state: 'editability',
        conditional: editability.conditional,
      }
    default:
      return null
  }
}

export const transformVisibility = (visibility: ItemVisibility) => {
  switch (visibility.type) {
    case 'expression':
      return {
        type: 'expression',
        state: 'visibility',
        expression: visibility.expression,
      }
    case 'conditional':
      return {
        type: 'conditional',
        state: 'visibility',
        conditional: visibility.conditional,
      }
    default:
      return null
  }
}
