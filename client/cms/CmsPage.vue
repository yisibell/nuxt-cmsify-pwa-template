<template>
  <div class="cms-page">
    <CmsGenericSection
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
      :content="cmsSection"
    />
  </div>
</template>

<script>
import CmsGenericSection from './CmsGenericSection'
export default {
  components: {
    CmsGenericSection,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cmsSections() {
      return this.content?.sections || []
    },
  },
}
</script>
