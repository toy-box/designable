import { usePage } from '../../hooks'

export const usePageParameters = () => {
  const page = usePage()
  return page.parameters || []
}
