import { runModule } from './module'

export default function (moduleOptions) {
  const moduleObject = this
  runModule(moduleObject, moduleOptions)
}
