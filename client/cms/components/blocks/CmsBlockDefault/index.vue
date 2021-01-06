<template>
  <!-- 该包裹层是为了显示区块，实际需去除-->
  <div class="cms-block-default">
    <CmsGenericElement v-if="getContent" :content="getContent" />
  </div>
</template>

<script>
import CmsGenericElement from '../../CmsGenericElement'

export default {
  name: 'CmsBlockDefault',
  components: {
    CmsGenericElement,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getSlots() {
      return this.content.slots || []
    },
    getContent() {
      return this.getSlots.length && this.getSlots[0]
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-block-default {
  border: 2px solid green;
  padding: 15px;
}
</style>
