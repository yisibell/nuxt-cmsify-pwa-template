/* eslint-disable */
require('dotenv').config()

const path = require('path')

const srcDir = 'client'

function resolve(dir) {
  return path.join(__dirname, '..', srcDir, dir)
}

function envFileName(env) {
  if (env === 'ft') {
    return '.env.ft'
  } else if (env === 'production') {
    return '.env.production'
  }

  return '.env.development'
}

module.exports = function(env) {
  return {
    router: {
      middleware: ['i18n'],
    },
    telemetry: true,
    // nuxt 构建源码目录
    srcDir,
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
      titleTemplate: '%s - nuxt-cmsify-pwa',
      title: 'nuxt-cmsify-pwa',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no',
        },
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
      { src: '~/plugins/cms', mode: 'client' },
      { src: '~/plugins/i18n' },
    ],
  
    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,
  
    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
      ['@nuxtjs/dotenv', { filename: envFileName(env), path: './' }],
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
      '@nuxtjs/pwa',
      '@nuxtjs/composition-api',
    ],
  
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      '~/modules/theme',
    ],
  
    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
      customVariables: ['~/assets/styles/vuetify/variables.scss'],
      theme: {
        dark: true,
      },
    },
  
    pwa: {
      manifest: {
        name: 'Nuxt Cmsify Pwa',
        lang: 'en',
        useWebmanifestExtension: false,
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
  
}