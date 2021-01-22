<template>
  <div>
    <h3>this is login page</h3>
    <p>based on definePageComponent method.</p>
    <client-only><svg-icon icon-class="hot" /></client-only>
  </div>
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { definePageComponent } from '~/utils'
export default definePageComponent({
  setup () {
    const { app } = useContext()

    onMounted(async () => {
      await console.log('in client: ', app)
      const res = await app.$api.site.get()
      console.log(res)
      app.$toast.global.info('this is a custom toast.')
    })
    return {
      page: 'login'
    }
  }
})
</script>
