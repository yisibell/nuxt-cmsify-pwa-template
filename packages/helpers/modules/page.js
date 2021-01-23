import { defineComponent } from '@nuxtjs/composition-api'

/**
 * 页面级组件包装器
 * @author hongwenqing(elenh)
 * @param {Object} options 组件配置选项
 * @return
 */
export const definePageComponent = (options) => {
  return defineComponent({
    layout(ctx) {
      const { env } = ctx
      const { NUXT_APP_THEME_NAME } = env

      return NUXT_APP_THEME_NAME || 'default'
    },
    ...options,
  })
}
