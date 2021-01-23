<template>
  <div :key="$route.path">
    <client-only>
      <component :is="getComponent" :cms-page="cmsPage" :page="page" />
    </client-only>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { useCms } from '~~/packages/composables/hooks/useCms'
import { definePageComponent } from '~~/packages/helpers'

const pagesMap = {
  'frontend.navigation.page': () => import('@/components/views/CategoryView'),
  'frontend.detail.page': () => import('@/components/views/ProductView'),
}

export default definePageComponent({
  setup() {
    const ctx = useContext()
    const { page } = useCms(ctx)

    const getComponent = computed(
      () => page.value && getComponentBy(page.value.resourceType)
    )

    function getComponentBy(resourceType) {
      if (!resourceType || !pagesMap[resourceType]) {
        return
      }
      return pagesMap[resourceType]
    }

    return {
      page: page.value,
      cmsPage: page.value && page.value.cmsPage,
      getComponent,
    }
  },
})
</script>
