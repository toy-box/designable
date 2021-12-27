import React from 'react'
import { TreeNode, ITreeNode } from '@designable/core'
import { MonacoInput } from '@toy-box/designable-react-settings-form'
import { transformToSchema, transformToTreeNode } from '../../src'
import { loadMetaSchema } from '../service'

const $PageParams = {
  type: 'void',
  'x-component': 'PageParams',
}

const $PageStates = {
  type: 'void',
  'x-component': 'PageParams',
}

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  const [code, setCode] = React.useState<string>()
  React.useEffect(() => {
    transformToSchema(
      props.tree,
      {},
      { loadMetaSchema },
      { $PageParams, $PageStates }
    ).then((data) => {
      setCode(JSON.stringify(data, null, 2))
    })
  }, [props.tree])
  return (
    <MonacoInput
      {...props}
      value={code}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)))
      }}
      language="json"
    />
  )
}
