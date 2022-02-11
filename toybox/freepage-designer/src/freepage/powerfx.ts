import { Field } from '@formily/core/esm/models/Field'
import { FormPath, isArr } from '@formily/shared'
import { ISchema } from '@formily/json-schema'
import { SchemaProperties } from '@formily/react'
import { RecalcEngine, BooleanValue } from '@toy-box/power-fx'
import { GeneralField } from '@formily/core'

const engine = new RecalcEngine()

export function schemaPatchPowerFX(schema: ISchema) {
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
      'x-reactions': reactionsPatchPowerFX(reactions),
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
    propertiesPatched[key] = schemaPatchPowerFX(properties[key])
  })
  return propertiesPatched
}

function reactionsPatchPowerFX(reactions: any | any[]) {
  if (isArr(reactions)) {
    return reactions.map((reaction) => reactionPatchPowerFX(reaction))
  }
  return reactionPatchPowerFX(reactions)
}

function reactionPatchPowerFX(reaction: any) {
  if (reaction == null) {
    return
  }
  if (reaction.state === 'visibility' && reaction.type === 'expression') {
    return (field: Field) => {
      const { form } = field
      engine.setFormula(
        field.address.toString(),
        reaction.expression,
        (name, value) => {
          if (value instanceof BooleanValue) {
            field.visible = value.value
          }
        }
      )
    }
  } else if (reaction.state === 'value' && reaction.type === 'expression') {
    return (field: Field) => {
      engine.setFormula(
        field.address.toString(),
        reaction.expression,
        (name, value) => {
          field.value = value.toObject()
        }
      )
    }
  }
  return reaction
}

function getFieldParents(field: GeneralField): GeneralField[] {
  if (field.parent) {
    return [field.parent, ...getFieldParents(field.parent)]
  }
  return []
}

function getParentByName(field: GeneralField, name: string) {
  const parents = getFieldParents(field)
  return parents.find((parent) => parent.componentType === name)
}
