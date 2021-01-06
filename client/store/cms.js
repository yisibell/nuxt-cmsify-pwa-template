import { cloneDeep } from 'lodash'

export const state = () => ({
  page: {},
})

export const getters = {
  getPage(state) {
    return state.page
  },
}

export const mutations = {
  SET_PAGE(state, obj) {
    state.page = cloneDeep(obj)
  },
}

export const actions = {
  fetchCmsPage({ commit }, path) {
    commit('SET_PAGE', { test: '' })
  },
}
