import { onGlobalSetup, provide, ref } from '@nuxtjs/composition-api'

export default () => {
  onGlobalSetup(() => {
    const globalKeyRef = ref(true)
    provide('globalKey', globalKeyRef)
  })
}
