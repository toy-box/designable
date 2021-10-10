import React from 'react'
import { IColumnVisible } from '@toy-box/meta-components/es/components/meta-table/interface'
import { omit } from '@toy-box/toybox-shared'

export const toArray = <T>(arrayItem: T | T[]) => {
  return Array.isArray(arrayItem) ? arrayItem : [arrayItem]
}

export function convertChildrenToData(
  nodes: React.ReactNode
): IColumnVisible[] {
  return toArray(nodes)
    .map((node: React.ReactElement, index: number) => {
      if (!React.isValidElement(node) || !node.type) {
        return null
      }
      return {
        key: node.props['fieldKey'],
        ...omit(node.props, ['fieldKey', 'children']),
      }
    })
    .filter((data) => data)
}
