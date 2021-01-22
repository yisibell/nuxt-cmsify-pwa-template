<template>
  <div :key="$route.path">
    <client-only>
      <component :is="getComponent" :cms-page="cmsPage" :page="page" />
    </client-only>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { definePageComponent } from '~/utils'
import { useCms } from '~/composables/hooks/useCms'

const pagesMap = {
  'frontend.navigation.page': () => import('@/components/views/CategoryView'),
  'frontend.detail.page': () => import('@/components/views/ProductView')
}

export default definePageComponent({
  setup () {
    function getComponentBy (resourceType) {
      if (!resourceType || !pagesMap[resourceType]) { return }
      return pagesMap[resourceType]
    }

    const { page } = useCms()

    const getComponent = computed(
      () => page.value && getComponentBy(page.value.resourceType)
    )

    return {
      page: page.value,
      cmsPage: page.value && page.value.cmsPage,
      getComponent
    }
  }
})
</script>
