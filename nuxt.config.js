import path from 'path'
import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

function envFileName() {
  const { NUXT_ENV_APP } = process.env

  if (NUXT_ENV_APP === 'ft') {
    return '.env.ft'
  } else if (NUXT_ENV_APP === 'production') {
    return '.env.production'
  }

  return '.env.development'
}

const srcDir = 'client'

function resolve(dir) {
  return path.join(__dirname, srcDir, dir)
}

export default {
  telemetry: true,
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  // nuxt 构建源码目录
  srcDir,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt-starter-template',
    title: 'nuxt-starter-template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Icons',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/index.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-toasted', mode: 'client' },
    { src: '~/plugins/request' },
    { src: '~/plugins/svg-icon', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: envFileName(), path: './' }],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/styles/vuetify/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient }) {
      if (isClient) {
        const svgRule = config.module.rules.find((rule) =>
          rule.test.test('.svg')
        )
        svgRule.exclude = [resolve('assets/icons/svg')]

        // Includes /assets/icons/svg for svg-sprite-loader
        config.module.rules.push({
          test: /\.svg$/,
          include: [resolve('assets/icons/svg')],
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        })
      }
    },
  },
}
