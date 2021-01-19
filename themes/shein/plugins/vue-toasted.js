import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  duration: 5000,
  position: 'top-center',
  keepOnHover: true,
  fitToScreen: false,
  fullWidth: false,
  iconPack: 'material',
  className: ['my-custom-toasted'],
})

const createToast = ({ type, icon, defaultMessage = '' } = {}) => {
  return {
    name: type,
    message: (payload) => {
      if (typeof payload === 'string') return payload

      return payload.message || defaultMessage
    },
    options: { type, icon },
  }
}

const registers = [
  createToast({ type: 'success', icon: 'done', defaultMessage: 'success...' }),
  createToast({ type: 'info', icon: 'info', defaultMessage: 'info...' }),
  createToast({ type: 'error', icon: 'error', defaultMessage: 'error...' }),
  createToast({
    type: 'warning',
    icon: 'warning',
    defaultMessage: 'warning...',
  }),
]

registers.forEach((v) => {
  Vue.toasted.register(v.name, v.message, v.options)
})

export default (ctx, inject) => {
  inject('toast', Vue.toasted)
}
