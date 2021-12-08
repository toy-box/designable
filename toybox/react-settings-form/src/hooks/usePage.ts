import { useRoot } from './useRoot'
import { PageParameter } from '@toy-box/freepage-components'

export const usePage = () => {
  return useRoot()
}

export const usePageParameters = () => {
  const page = usePage()
  return page.props.parameters as PageParameter[]
}
