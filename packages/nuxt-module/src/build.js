import path from 'path'

export function extendBuild(moduleObject, moduleOptions) {
  const { themeName = 'default' } = moduleOptions
  const srcDir = `themes/${themeName}`
  const svgDir = path.join(process.cwd(), srcDir, 'assets/icons/svg')

  // extend Webpack config
  moduleObject.extendBuild((config, { isClient }) => {
    if (isClient) {
      /* extend svg-sprite-loader */
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [svgDir]

      config.module.rules.push({
        test: /\.svg$/,
        include: [svgDir],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      })
    }
  })
}
