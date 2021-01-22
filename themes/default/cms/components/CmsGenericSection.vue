<template>
  <component
    :is="getComponent"
    :content="content"
    :style="slotStyles"
    class="cms-section"
  />
</template>

<script>
import { getCmsSectionComponent } from '../cmsNameMapper'
export default {
  name: 'CmsGenericSection',
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getComponent () {
      return getCmsSectionComponent(this.content)
    },
    backgroundMediaMode () {
      return this.content.backgroundMediaMode
    },
    slotStyles () {
      const { backgroundMedia } = this.content
      return {
        backgroundImage: backgroundMedia ? `url(${backgroundMedia.url})` : null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cms-section {
  border: 2px solid yellow;
  padding: 15px;
}
</style>
