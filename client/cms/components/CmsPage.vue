<template>
  <div class="cms-page">
    <cms-generic-section
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
      :content="cmsSection"
    />
  </div>
</template>

<script>
export default {
  name: 'CmsPage',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cmsSections() {
      return this.content ? this.content.sections : []
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-page {
  border: 2px solid blue;
  padding: 15px;
}
</style>
