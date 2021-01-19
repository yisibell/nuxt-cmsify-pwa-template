const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function buildTheme(themeName = 'default') {
  consola.info(`start building ${themeName} theme...`)
  const cmdStr = `cross-env NUXT_APP_ENV=production NUXT_APP_THEME_NAME=${themeName} nuxt build`
  await execa.command(cmdStr, {
    stdio: 'inherit',
  })

  consola.success(`${themeName} theme build complete.`)
}

async function run() {
  try {
    const { all, theme } = argv
    console.log(all)
    if (all) {
      await buildTheme()
      await buildTheme('shein')
    } else {
      await buildTheme(theme)
    }
  } catch (err) {
    consola.error(err)
  }
}

run()
