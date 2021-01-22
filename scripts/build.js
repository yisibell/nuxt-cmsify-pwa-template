const fs = require('fs')
const path = require('path')
const execa = require('execa')
const consola = require('consola')
const argv = require('yargs/yargs')(process.argv.slice(2)).parse()

async function buildTheme (themeName = 'default') {
  consola.info(`start building ${themeName} theme...`)
  const cmdStr = `cross-env NUXT_APP_ENV=production NUXT_APP_THEME_NAME=${themeName} nuxt build`
  await execa.command(cmdStr, {
    stdio: 'inherit'
  })

  consola.success(`${themeName} theme build complete.`)
}

function getThemeDirNames () {
  const basePath = path.join(process.cwd(), 'themes')
  const arr = fs.readdirSync(basePath)
  const dirs = arr.filter(v => fs.statSync(`${basePath}/${v}`).isDirectory())

  return dirs
}

async function run () {
  try {
    const { all, theme } = argv

    if (all) {
      const themeNames = getThemeDirNames()

      for (let i = 0; i < themeNames.length; i++) {
        await buildTheme(themeNames[i])
      }
    } else {
      await buildTheme(theme)
    }
  } catch (err) {
    consola.error(err)
  }
}

run()
