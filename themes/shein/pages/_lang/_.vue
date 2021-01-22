<template>
  <div :key="$route.path">
    {{ page }}
  </div>
</template>

<script>
import { definePageComponent } from '~~/packages/helpers'

export default definePageComponent({
  setup() {
    return {
      page: 'home page',
    }
  },
})
</script>
