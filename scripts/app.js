const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function run() {
  try {
    const { env = 'production' } = argv
    const cmdStr = `cross-env NODE_ENV=production NUXT_APP_ENV=${env} node server/index.js`

    await execa.command(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    consola.error(err)
  }
}

run()
