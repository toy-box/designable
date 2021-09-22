import { Field } from '@formily/core/esm/models/Field'
import { isArrayField } from '@formily/core'
import { isArr } from '@formily/shared'
import { formulaParse } from '@toy-box/formula'

export function reactionPatches(reactions: any | any[]) {
  if (isArr(reactions)) {
    return reactions.map((reaction) => formulaReactionPatch(reaction))
  }
  return formulaReactionPatch(reactions)
}

export function formulaReactionPatch(reaction: any) {
  if (reaction.type === 'formula') {
    return (field: Field) => {
      if (field.form.initialized) {
        const result = formulaParse(reaction.formula, (pattern: string) => {
          const path = pattern.substr(2, pattern.length - 3)
          const query = field.form.query(getParentPath(path))
          const takenField = query.take()
          const fieldValue = field.form.getValuesIn(path)
          const brotherAddress = `${getParentPath(path)}.${getIndex(
            field
          )}.${getFieldKey(path)}`
          const brotherValue = field.form.getValuesIn(brotherAddress)
          const arrayValue = field.form.getValuesIn(takenField?.path)
          if (isArrayField(field.parent) && isBrother(field, path)) {
            return brotherValue
          }
          if (takenField && isArrayField(takenField)) {
            return arrayValue.map(
              (item: Record<string, any>) => item[getFieldKey(path)]
            )
          }
          return fieldValue
        })

        if (result.success) {
          switch (reaction.state) {
            case 'value':
              field.form.setValuesIn(field.path, result.result)
            case 'visible':
              field.visible = result.result
            case 'editable':
              field.editable = result.result
            default:
              break
          }
        }
      }
    }
  }
  return reaction
}

function getParentPath(path: string) {
  const pathArr = path.split('.')
  pathArr.splice(pathArr.length - 1, 1)
  return pathArr.join('.')
}

function isBrother(field: Field, path: string) {
  return field.parent.path.toString() === getParentPath(path)
}

function getIndex(field: Field) {
  const pathArr = field.path.toArr()
  return pathArr[pathArr.length - 2]
}

function getFieldKey(field: Field | string) {
  if (typeof field == 'string') {
    const pathArr = field.split('.')
    return pathArr[pathArr.length - 1]
  }
  const pathArr = field.path.toArr()
  return pathArr[pathArr.length - 1]
}
