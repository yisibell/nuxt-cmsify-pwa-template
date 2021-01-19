const execa = require('execa')
const consola = require('consola')

async function run() {
  const { stdout, stderr } = await execa('npm', ['start'])
  consola.info('stdout:', stdout)
  consola.error('stderr:', stderr)
}

run()
