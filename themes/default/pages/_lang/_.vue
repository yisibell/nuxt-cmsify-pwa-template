<template>
  <div :key="$route.path">
    <component :is="getComponent" :cms-page="cmsPage" :page="page" />
  </div>
</template>

<script>
import { useCms } from '~~/packages/composables/hooks/useCms'
import { definePageComponent } from '~~/packages/helpers'

const pagesMap = {
  'frontend.navigation.page': () => import('@/components/views/CategoryView'),
  'frontend.detail.page': () => import('@/components/views/ProductView'),
}

export default definePageComponent({
  async asyncData() {
    const page = await useCms()

    return {
      page,
      cmsPage: page && page.cmsPage,
    }
  },
  computed: {
    getComponent() {
      return this.page && this.getComponentBy(this.page.resourceType)
    },
  },
  methods: {
    getComponentBy(resourceType) {
      if (!resourceType || !pagesMap[resourceType]) {
        return
      }
      return pagesMap[resourceType]
    },
  },
})
</script>
