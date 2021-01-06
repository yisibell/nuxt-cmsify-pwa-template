import { ref } from '@nuxtjs/composition-api'

const createBlock = (id = 1, sectionId) => ({
  sectionId,
  id,
  type: 'text',
  slots: [
    {
      slot: 'content',
      type: 'text',
      config: {},
      data: {
        msg: `section id: ${sectionId}, block id: ${id} -> this is a text Element`,
      },
    },
  ],
})

const createSection = (sectionId = 1, pageId = 1) => ({
  pageId,
  type: 'default',
  blocks: [
    createBlock(1, sectionId),
    createBlock(2, sectionId),
    createBlock(3, sectionId),
  ],
})

export const useCms = (ctx) => {
  const { store } = ctx
  const page = ref({
    resourceType: 'frontend.navigation.page',
    cmsPage: {
      sections: [createSection(), createSection(2, 1), createSection(3, 1)],
    },
  })

  // 接口拉取页面数据
  store.commit('cms/SET_PAGE', { test: '' })

  return {
    page,
  }
}
