const pageList = [
  {
    name: '首页',
    id: 'indexPage',
    parameters: [],
  },
  {
    name: '列表',
    id: 'listPage',
    parameters: [
      {
        key: 'name',
        type: 'string',
      },
      {
        key: 'type',
        type: 'string',
      },
      {
        key: 'limit',
        type: 'number',
      },
    ],
  },
  {
    name: '详情',
    id: 'viewDetail',
    parameters: [
      {
        key: 'id',
        type: 'string',
      },
    ],
  },
]

export const loadPageList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(pageList.map((page) => ({ label: page.name, value: page.id })))
    }, 500)
  })
}

export const loadPageByValue = (value: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        pageList
          .map((page) => ({ label: page.name, value: page.id }))
          .find((page) => page.value === value)
      )
    }, 500)
  })
}

export const loadPageParameters = (pageId: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(pageList.find((page) => page.id === pageId)?.parameters)
    }, 500)
  })
}
