import { usePage } from '../../hooks'

export const usePageStates = () => {
  const page = usePage()
  return page.states || {}
}
