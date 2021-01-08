import { ref } from '@nuxtjs/composition-api'

const createBlock = (id = 1, sectionId, sectionPosition) => ({
  sectionPosition,
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

const createSection = (sectionId = 1, pageId = 1, type = 'default') => ({
  pageId,
  type,
  blocks: [
    createBlock(1, sectionId, 'sidebar'),
    createBlock(2, sectionId, 'sidebar'),
    createBlock(3, sectionId, 'main'),
    createBlock(4, sectionId, 'main'),
  ],
})

export const useCms = (ctx) => {
  const { store } = ctx
  const page = ref({
    resourceType: 'frontend.navigation.page',
    cmsPage: {
      sections: [
        createSection(),
        createSection(2, 1, 'sidebar'),
        createSection(3, 1),
      ],
    },
  })

  // 接口拉取页面数据
  store.commit('cms/SET_PAGE', { test: '' })

  return {
    page,
  }
}
