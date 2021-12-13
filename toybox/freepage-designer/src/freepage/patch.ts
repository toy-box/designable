import { Field } from '@formily/core/esm/models/Field'
import { GeneralField } from '@formily/core'
import { FormPath, isArr } from '@formily/shared'
import { parseResult } from '@toy-box/formula'
import { ISchema } from '@formily/json-schema'
import { SchemaProperties } from '@formily/react'

export function schemaPatch(schema: ISchema) {
  const { ['x-reactions']: reactions, properties } = schema
  let newSchema: ISchema = { ...schema }
  if (properties) {
    newSchema = Object.assign(schema, {
      properties:
        typeof properties === 'object'
          ? propertiesPatch(properties)
          : properties,
    })
  }
  if (reactions) {
    newSchema = Object.assign(schema, {
      'x-reactions': reactionsPatch(reactions),
    })
  }
  return newSchema
}

function propertiesPatch(
  properties: SchemaProperties<any, any, any, any, any, any, any, any>
) {
  const propertiesPatched: SchemaProperties<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  > = {}
  Object.keys(properties).forEach((key) => {
    propertiesPatched[key] = schemaPatch(properties[key])
  })
  return propertiesPatched
}

function reactionsPatch(reactions: any | any[]) {
  if (isArr(reactions)) {
    return reactions.map((reaction) => reactionPatch(reaction))
  }
  return reactionPatch(reactions)
}

function reactionPatch(reaction: any) {
  if (reaction.state === 'visibility' && reaction.type === 'expression') {
    return (field: Field) => {
      if (field.form.initialized) {
        const result = parseResult(reaction.expression, (path: string) => {
          const values = getValues(field)
          return FormPath.getIn(values, path)
        })
        if (result.success) {
          field.visible = result.result
        }
      }
    }
  }
  return reaction
}

function getValues(field: GeneralField) {
  const { form } = field
  return {
    $PageParams: form.getValuesIn('$PageParams'),
    ...form.getValuesIn(field.path),
  }
}
