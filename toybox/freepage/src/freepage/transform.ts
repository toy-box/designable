import { ISchema, Schema } from '@formily/json-schema'
import { ITreeNode, TreeNode } from '@designable/core'
import { clone, uid, omit } from '@toy-box/toybox-shared'
import { IFieldMeta } from '@toy-box/meta-schema'
import { ItemEditability, ItemVisibility } from './types'

export interface ITransformerOptions {
  designableFieldName?: string
  designableFormName?: string
}

export interface IFormilySchema {
  schema?: ISchema
  form?: Record<string, any>
}

const createOptions = (options: ITransformerOptions): ITransformerOptions => {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Form',
    ...options,
  }
}

export const transformToSchema = (
  node: TreeNode,
  options?: ITransformerOptions
): IFormilySchema => {
  const realOptions = createOptions(options)
  const root = node.find((child) => {
    return child.componentName === realOptions.designableFormName
  })
  const schema = {
    type: 'object',
    properties: {},
  }
  if (!root) return { schema }
  const createSchema = (node: TreeNode, schema: ISchema = {}) => {
    if (node !== root) {
      Object.assign(
        schema,
        clone(omit(node.props, ['visibility', 'editability']))
      )
    }
    schema['x-designable-id'] = node.id
    if (schema.type === 'array') {
      if (node.children[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName
        ) {
          schema.items = createSchema(node.children[0])
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
    } else {
      node.children.forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return
        const key = child.props.name || child.id
        schema.properties = schema.properties || {}
        schema.properties[key] = createSchema(child)
        schema.properties[key]['x-index'] = index
        if (child.props.visibility) {
          const visibilityReaction = transformVisibility(child.props.visibility)
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
        if (child.props.editability) {
          const editabilityReaction = transformEditability(
            child.props.editability
          )
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
      })
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
        path.push(node.props.name)
        // TODO: 修改 objectMeta获取的方式

        const objectMeta: IFieldMeta = {
          key: 'user',
          name: 'user',
          type: 'object',
          properties: {
            name: {
              key: 'name',
              name: 'Name',
              type: 'string',
              format: 'date',
            },
          },
        }
        schema['x-component-props'] = schema['x-component-props'] || {}
        schema['x-component-props'].field = fetchMeta(path, objectMeta) || {}
      }
    }
    return schema
  }
  return { form: clone(root.props), schema: createSchema(root, schema) }
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
  formily: IFormilySchema = {},
  options?: ITransformerOptions
) => {
  const realOptions = createOptions(options)
  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: formily.form,
    children: [],
  }
  const schema = new Schema(formily.schema)
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
    case 'formula':
      return {
        type: 'formula',
        state: 'editable',
        formula: editability.formula,
      }
    case 'conditional':
      return {
        type: 'conditional',
        state: 'editable',
        conditional: editability.conditional,
      }
    default:
      return null
  }
}

export const transformVisibility = (visibility: ItemVisibility) => {
  switch (visibility.type) {
    case 'formula':
      return {
        type: 'formula',
        state: 'visible',
        formula: visibility.formula,
      }
    case 'conditional':
      return {
        type: 'conditional',
        state: 'visible',
        conditional: visibility.conditional,
      }
    default:
      return null
  }
}
