<template>
  <v-app>
    <v-app-bar class="app-bar" app extended>
      <v-toolbar-title>shein</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useContext, onMounted } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { app } = useContext()

    onMounted(() => {
      console.log(app)
    })
  },
}
</script>

<style lang="scss" scoped>
.app-bar {
  &__right {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &__search {
      width: 150px;
    }
  }
}
</style>
