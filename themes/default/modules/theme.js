import consola from 'consola'

export default function theme(moduleOptions) {
  const moduleObject = this
  const { addPlugin } = moduleObject

  consola.info(addPlugin)
}
