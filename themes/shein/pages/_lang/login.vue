<template>
  <div>
    <h3>this is login page</h3>
    <p>based on definePageComponent method.</p>
  </div>
</template>

<script>
import { onMounted } from '@nuxtjs/composition-api'
import { definePageComponent } from '~~/packages/helpers'
export default definePageComponent({
  setup() {
    onMounted(() => {
      console.log(66666)
    })
    return {
      page: 'login',
    }
  },
})
</script>
