<template>
  <div ref="root">this is _ page</div>
</template>

<script>
import { ref, onMounted } from '@nuxtjs/composition-api'
export default {
  asyncData({ params }) {
    console.log(params)
  },
  setup() {
    const root = ref(null)
    onMounted(() => {
      console.log(root.value)
    })

    return {
      root,
    }
  },
}
</script>
