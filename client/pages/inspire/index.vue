<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <div>
        <svg-icon icon-class="hot" />
        <span>hello nuxt starter template.</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Inspire',
  mounted() {
    this.$toast.global.success('fafagagagag')
    this.$toast.global.error()
    this.$toast.global.warning()
    this.$toast.global.info()
  },
}
</script>
