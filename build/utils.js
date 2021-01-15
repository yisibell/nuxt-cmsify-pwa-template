exports.envFileName = function () {
  const { NUXT_ENV_APP } = process.env

  if (NUXT_ENV_APP === 'ft') {
    return '.env.ft'
  } else if (NUXT_ENV_APP === 'production') {
    return '.env.production'
  }

  return '.env.development'
}
