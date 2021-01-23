import path from 'path'
import consola from 'consola'
import { extendBuild } from './build'

export async function runModule(moduleObject, moduleOptions) {
  const {
    vuetify: vuetifyOptions,
    pwa: pwaOptions,
    dotenv: dotenvOptions,
  } = moduleObject.options

  // extend webpack config
  extendBuild(moduleObject, moduleOptions)

  consola.info('add @nuxtjs/composition-api')
  await moduleObject.addModule('@nuxtjs/composition-api', true)

  consola.info('add @nuxtjs/vuetify')
  await moduleObject.addModule(['@nuxtjs/vuetify', vuetifyOptions], true)

  consola.info('add @nuxtjs/pwa')
  await moduleObject.addModule(['@nuxtjs/pwa', pwaOptions], true)

  consola.info('add @nuxtjs/dotenv')
  await moduleObject.addModule(['@nuxtjs/dotenv', dotenvOptions], true)

  consola.info('1. add svg-icon plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'svg-icon.js'),
    fileName: 'svg-icon.js',
    mode: 'client',
    options: moduleOptions,
  })

  consola.info('2. add vue-toasted plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'vue-toasted.js'),
    fileName: 'vue-toasted.js',
    mode: 'client',
    options: moduleOptions,
  })

  consola.info('3. add api and request plugin')
  moduleObject.addPlugin({
    src: path.join(__dirname, '..', 'plugins', 'request.js'),
    fileName: 'request.js',
    options: moduleOptions,
  })
}
