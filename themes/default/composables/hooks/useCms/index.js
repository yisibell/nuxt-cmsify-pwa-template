import { useContext, useAsync } from '@nuxtjs/composition-api'

export const useCms = () => {
  const { store } = useContext()

  // nuxt 原始选项 async 钩子函数
  const page = useAsync(async () => {
    const page = await store.dispatch('cms/fetchCmsPage')
    return page
  })

  return {
    page
  }
}
