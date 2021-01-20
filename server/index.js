const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const Koa = require('koa')
const { getSiteConfig } = require('./api/site')

async function start() {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3001
  const isDev = !(app.env === 'production')
  const { NUXT_APP_THEME_NAME } = process.env

  consola.info(`[${app.env}]: \n`)

  let nuxtDev = null

  if (isDev) {
    // Import and Set Nuxt.js options
    const config = require('../nuxt.config.js')({
      themeName: NUXT_APP_THEME_NAME,
    })

    config.dev = true
    nuxtDev = new Nuxt(config)

    // Build in development
    const builder = new Builder(nuxtDev)
    await builder.build()
  } else {
    app.use(async (ctx, next) => {
      const res = await getSiteConfig()
      const { site } = res.data.data
      const { themeName } = site
      const config = require('../nuxt.config.js')({ themeName })

      config.dev = false

      const nuxtProd = new Nuxt(config)
      await nuxtProd.ready()

      // handle nuxt instance to koa ctx.state
      ctx.state.nuxtProd = nuxtProd
      next()
    })
  }

  // last middleware to render nuxt app
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    const nuxt = nuxtDev || ctx.state.nuxtProd
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.success(`Server listening on http://${host}:${port}`)
}

start()
