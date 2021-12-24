import { Engine } from '@designable/core'
import { message } from 'antd'
import { transformToSchema, transformToTreeNode } from '../../src'
import { loadMetaSchema } from './meta'

const $PageParams = {
  type: 'void',
  'x-component': 'PageParams',
}

export const saveSchema = (designer: Engine) => {
  transformToSchema(
    designer.getCurrentTree(),
    {},
    { loadMetaSchema },
    { $PageParams }
  ).then(({ page, schema }) => {
    localStorage.setItem('formily-schema', JSON.stringify({ page, schema }))
    message.success('Save Success')
  })
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')))
    )
  } catch {}
}
