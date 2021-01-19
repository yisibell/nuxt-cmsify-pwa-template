module.exports = {
  apps: [
    {
      name: 'NuxtCmsifyPwaTemplate',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './scripts/app.js',
      args: 'start',
    },
  ],
}
