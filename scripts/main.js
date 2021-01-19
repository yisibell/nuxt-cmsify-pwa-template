const util = require('util')
const exec = util.promisify(require('child_process').exec)
const consola = require('consola')

async function start() {
  const { stdout, stderr } = await exec('npm start')
  consola.info('stdout:', stdout)
  consola.error('stderr:', stderr)
}

start()
