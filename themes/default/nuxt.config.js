/* eslint-disable */ 

module.exports = {
  head: {
    titleTemplate: '%s - nuxt-cmsify-pwa',
    title: 'luban',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Icons',
      },
    ],
  },

  css: ['~/assets/styles/index.scss'],

  plugins: [
    { src: '~/plugins/cms', mode: 'client' },
    { src: '~/plugins/i18n' },
  ],

  router: {
    middleware: ['i18n'],
  },

}
