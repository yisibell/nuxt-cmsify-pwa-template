<template>
  <div>
    <h3>this is login page</h3>
    <p>based on definePageComponent method.</p>
  </div>
</template>

<script>
import { definePageComponent } from '~/utils'
export default definePageComponent({
  setup() {
    return {
      page: 'login',
    }
  },
})
</script>
