export const state = () => ({
  name: 'elenh',
  age: 18,
  email: 'yisiwings@163.com',
})

export const mutations = {
  SET_USER(state, { key, value } = {}) {
    state[key] = value
  },
}
