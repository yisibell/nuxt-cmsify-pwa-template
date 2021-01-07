export const state = () => ({
  token: 'this is a awesome token',
  locales: ['en', 'zh'],
  locale: 'en',
})

export const getters = {
  token(state) {
    return state.token
  },
}

export const mutations = {
  SET_TOKEN(state, ticket) {
    state.token = ticket
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}
