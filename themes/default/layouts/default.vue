<template>
  <v-app>
    <v-app-bar class="app-bar" app extended>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t('home.title') }}</v-toolbar-title>

      <div class="app-bar__right">
        <template v-if="!isMobile">
          <v-btn icon><v-icon>mdi-account-outline</v-icon></v-btn>
          <v-btn icon>
            <v-badge color="pink" content="2" overlap>
              <v-icon>mdi-heart-outline</v-icon></v-badge
            >
          </v-btn>

          <v-btn icon>
            <v-badge color="green" content="6" overlap>
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <!-- locale lang switch menu -->
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small>mdi-translate</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(lang, i) in locales" :key="i">
              <v-list-item-title @click="handleLocaleChange(lang)">
                <v-btn text block>{{ lang }}</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- dark light mode toggle -->
        <v-btn v-if="isDark" small icon @click="$vuetify.theme.dark = false">
          <v-icon>mdi-white-balance-sunny</v-icon>
        </v-btn>
        <v-btn v-else small icon @click="$vuetify.theme.dark = true">
          <v-icon>mdi-weather-night</v-icon>
        </v-btn>
      </div>

      <template #extension>
        <v-text-field
          v-model="searchStr"
          class="app-bar__right__search"
          prepend-inner-icon="search"
          solo
          label="search"
          clearable
          dense
        >
        </v-text-field>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      this is navigation drawer
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation v-if="isMobile" grow app>
      <v-btn>
        <span>{{ $t('bottomNavgation.favorites') }}</span>
        <v-badge color="pink" content="3" overlap
          ><v-icon>mdi-heart</v-icon></v-badge
        >
      </v-btn>

      <v-btn>
        <span>{{ $t('bottomNavgation.cart') }}</span>
        <v-badge color="green" content="2" overlap
          ><v-icon>mdi-cart</v-icon></v-badge
        >
      </v-btn>

      <v-btn>
        <span>{{ $t('bottomNavgation.account') }}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-footer class="d-flex justify-center">
      <div>this is app footer</div>
    </v-footer>
  </v-app>
</template>

<script>
import { useContext, computed, ref } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { $vuetify, store, route, env } = useContext()

    console.log(env)

    const isMobile = computed(() => $vuetify.breakpoint.mobile)
    const theme = computed(() => $vuetify.theme)
    const isDark = computed(() => theme.value.isDark)
    const locales = computed(() => store.state.locales)
    const searchStr = ref('')

    function handleLocaleChange(newLang) {
      const { fullPath, query, params } = route.value
      const { lang } = params
      let restPath = fullPath

      if (lang) {
        restPath = restPath.replace(/^\/[^/]+/, '')
      }

      const path = `/${newLang}${restPath}`

      this.$router.push({ path, query })
    }

    return {
      drawer: false,
      isMobile,
      theme,
      isDark,
      locales,
      searchStr,
      handleLocaleChange,
    }
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
