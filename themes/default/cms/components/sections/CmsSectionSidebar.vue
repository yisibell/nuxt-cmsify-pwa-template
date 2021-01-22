<template>
  <div
    class="cms-sidebar-section"
    :class="{ 'cms-sidebar-section--boxed': isSizingModeBoxed }"
  >
    <div
      v-if="getSidebarBlocks.length"
      class="cms-sidebar-section__sidebar"
      :class="{ 'cms-sidebar-section__sidebar--boxed': isSizingModeBoxed }"
    >
      <CmsGenericBlock
        v-for="cmsBlock in getSidebarBlocks"
        :key="cmsBlock.id"
        :content="cmsBlock"
      />
    </div>
    <div class="cms-sidebar-section__main">
      <CmsGenericBlock
        v-for="cmsBlock in getMainBlocks"
        :key="cmsBlock.id"
        :content="cmsBlock"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CmsSectionSidebar',
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 所有 blocks
    getBlocks () {
      return this.content.blocks || []
    },
    // 侧边栏 blocks
    getSidebarBlocks () {
      return this.getBlocks.filter(
        block => block.sectionPosition === 'sidebar'
      )
    },
    // 主体 blocks
    getMainBlocks () {
      return this.getBlocks.filter(block => block.sectionPosition === 'main')
    },
    isSizingModeBoxed () {
      return this.content.sizingMode === 'boxed'
    }
  }
}
</script>

<style lang="scss" scoped>
.cms-sidebar-section {
  display: flex;

  &__sidebar {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
