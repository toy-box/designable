import { useLocation } from 'react-router-dom'

export interface PageLocationState {
  params: Record<string, any>
}

export const useStateParams = () => {
  const state = useLocation().state as PageLocationState
  return state?.params
}
