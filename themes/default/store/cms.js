import { cloneDeep } from 'lodash'

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
        msg: `section id: ${sectionId}, block id: ${id} -> this is a text Element`
      }
    }
  ]
})

const createSection = (sectionId = 1, pageId = 1, type = 'default') => ({
  pageId,
  type,
  blocks: [
    createBlock(1, sectionId, 'sidebar'),
    createBlock(2, sectionId, 'sidebar'),
    createBlock(3, sectionId, 'main'),
    createBlock(4, sectionId, 'main')
  ]
})

export const state = () => ({
  page: {}
})

export const getters = {
  getPage (state) {
    return state.page
  }
}

export const mutations = {
  SET_PAGE (state, obj) {
    state.page = cloneDeep(obj)
  }
}

export const actions = {
  // 拉取 cms page 数据
  fetchCmsPage ({ commit }, path) {
    console.log(path)
    return new Promise((resolve) => {
      const page = {
        resourceType: 'frontend.navigation.page',
        cmsPage: {
          sections: [
            createSection(),
            createSection(2, 1, 'sidebar'),
            createSection(3, 1)
          ]
        }
      }
      setTimeout(() => {
        commit('SET_PAGE', page)
        resolve(page)
      }, 1000)
    })
  }
}
