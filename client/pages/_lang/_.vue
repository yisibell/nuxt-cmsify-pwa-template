<template>
  <div :key="$route.path">
    <client-only>
      <component :is="getComponent" :cms-page="cmsPage" :page="page" />
    </client-only>
  </div>
</template>

<script>
import { useCms } from '~/composables/hooks/useCms'

const pagesMap = {
  'frontend.navigation.page': () => import('@/components/views/CategoryView'),
  'frontend.detail.page': () => import('@/components/views/ProductView'),
}

export function getComponentBy(resourceType) {
  if (!resourceType || !pagesMap[resourceType]) return
  return pagesMap[resourceType]
}

export default {
  asyncData(ctx) {
    const { page } = useCms(ctx)

    return {
      page: page.value,
      cmsPage: page.value.cmsPage,
    }
  },
  computed: {
    getComponent() {
      return this.page && getComponentBy(this.page.resourceType)
    },
  },
}
</script>
