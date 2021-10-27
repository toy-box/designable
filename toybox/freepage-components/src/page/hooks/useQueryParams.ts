import { useLocation } from 'react-router-dom'
import qs from 'qs'

export const useQueryParams = () => {
  return qs.parse(useLocation().search.replace(/^\?/, ''))
}
