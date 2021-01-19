<template>
  <div
    class="sw-default-section"
    :class="{ 'sw-default-section--boxed': isSizingModeBoxed }"
  >
    <CmsGenericBlock
      v-for="cmsBlock in getBlocks"
      :key="cmsBlock.id"
      :content="cmsBlock"
    />
  </div>
</template>

<script>
export default {
  name: 'CmsSectionDefault',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getBlocks() {
      return this.content.blocks || []
    },
    isSizingModeBoxed() {
      return this.content.sizingMode === 'boxed'
    },
  },
}
</script>
