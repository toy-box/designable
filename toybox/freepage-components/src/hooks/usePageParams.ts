import { useForm } from '@formily/react'

export const usePageParams = () => {
  const form = useForm()
  return form.getValuesIn('$PageParams') || {}
}
