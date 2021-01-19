const execa = require('execa')
const consola = require('consola')

async function run() {
  try {
    await execa('npm', ['start'], {
      stdio: 'inherit',
    })
  } catch (err) {
    consola.error(err)
  }
}

run()
