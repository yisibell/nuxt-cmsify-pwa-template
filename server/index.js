const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const Koa = require('koa')

async function start() {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  const { NUXT_ENV_APP } = process.env

  // Import and Set Nuxt.js options
  const config = require('./nuxt.config.js')(NUXT_ENV_APP)
  config.dev = !(app.env === 'production')

  consola.info(`[${app.env}]: \n`)

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.success(`Server listening on http://${host}:${port}`) // eslint-disable-line no-console
}

start()
