require('dotenv').config()
const defu = require('defu')

const config = ({
  buildDirBase = '.nuxt/themes', // 构建目录基地址
  srcDirBase = 'themes', // 构建源码目录基地址
  themeName = 'default', // 皮肤名称
} = {}) => {
  const { NUXT_APP_THEME_NAME, NUXT_APP_ENV } = process.env
  themeName = NUXT_APP_THEME_NAME || themeName

  const srcDir = `${srcDirBase}/${themeName}`
  const buildDir = `${buildDirBase}/${themeName}`

  // extra nuxt config for current theme
  let extraConfig = {}
  try {
    extraConfig = require(`./${srcDir}/nuxt.config.js`)
  } catch (err) {
    extraConfig = {}
  }

  const dotenvFileName = () => {
    if (NUXT_APP_ENV === 'ft') {
      return '.env.ft'
    } else if (NUXT_APP_ENV === 'production') {
      return '.env.production'
    }

    return '.env.development'
  }

  const mainConfig = {
    // nuxt 构建输出目录
    buildDir,
    // nuxt 构建源码目录
    srcDir,
    telemetry: true,
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
    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,
    buildModules: ['@nuxtjs/eslint-module'],
    modules: ['~~/packages/nuxt-module'],
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
    dotenv: {
      filename: dotenvFileName(),
      path: './',
    },
  }

  return defu(mainConfig, extraConfig)
}

module.exports = config
