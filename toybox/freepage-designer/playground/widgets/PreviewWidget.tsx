import React from 'react'
import { Schema } from '@formily/react'
import { TreeNode } from '@designable/core'
import { transformToSchema, schemaPatch, FreePage } from '../../src'
import {
  loadMetaRepoList,
  loadMetaRepoListByValue,
  loadMetaSchema,
  loadMetaData,
  loadMetaDataList,
  loadMetaDataPageable,
  handleLinkAction,
  handlePageAction,
  handleAutoflowAction,
} from '../service'

const $PageParams = {
  type: 'void',
  'x-component': 'PageParams',
}

export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const [formProps, setFormProps] = React.useState<any>()
  const [schema, setSchema] = React.useState<any>()
  Schema.registerPatches(schemaPatch)
  React.useEffect(() => {
    transformToSchema(props.tree, {}, { loadMetaSchema }, { $PageParams }).then(
      ({ form: formProps, schema }) => {
        setFormProps(formProps)
        setSchema(schema)
      }
    )
  }, [props.tree])
  return (
    <FreePage
      pageProps={formProps}
      schema={schema}
      action={{
        handleLinkAction,
        handlePageAction,
        handleAutoflowAction,
      }}
      meta={{
        loadMetaRepoList,
        loadMetaRepoListByValue,
        loadMetaSchema,
        loadMetaData,
        loadMetaDataList,
        loadMetaDataPageable,
      }}
    />
  )
}
