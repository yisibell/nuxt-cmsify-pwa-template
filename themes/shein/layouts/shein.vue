<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>{{ $t('home.title') }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
