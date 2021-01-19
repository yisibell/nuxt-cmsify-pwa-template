/* for development mode */

const argv = require('yargs/yargs')(process.argv.slice(2)).parse()
const execa = require('execa')

async function run() {
  const { theme = 'default', env = 'development' } = argv
  const cmdStr = `cross-env NODE_ENV=development NUXT_APP_ENV=${env} NUXT_APP_THEME_NAME=${theme} node server/index.js`

  await execa.command(cmdStr, {
    stdio: 'inherit',
  })
}

run()
