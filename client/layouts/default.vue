<template>
  <v-app>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>

      <!-- locale lang switch menu -->
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(lang, i) in locales" :key="i">
            <v-list-item-title @click="changeLocale(lang)">
              <v-btn text block>{{ lang }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t('home.title') }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({ drawer: null }),
  computed: {
    ...mapState(['locales']),
  },
  methods: {
    changeLocale(newLang) {
      const { fullPath, query, params } = this.$route
      const { lang } = params
      let restPath = fullPath

      if (lang) {
        restPath = restPath.replace(/^\/[^/]+/, '')
      }

      const path = `/${newLang}${restPath}`

      this.$router.push({ path, query })
    },
  },
}
</script>
