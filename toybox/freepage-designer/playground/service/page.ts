const pages = [
  {
    label: '首页',
    value: 'indexPage',
  },
  {
    label: '列表',
    value: 'listPage',
  },
  {
    label: '详情',
    value: 'viewDetail',
  },
]

export const loadPageList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(pages)
    }, 500)
  })
}

export const loadPageByValue = (value: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(pages.find((page) => page.value === value))
    }, 500)
  })
}
