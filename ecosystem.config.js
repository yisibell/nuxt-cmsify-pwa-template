module.exports = {
  apps: [
    {
      name: 'NuxtCmsifyPwaTemplate',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
}
