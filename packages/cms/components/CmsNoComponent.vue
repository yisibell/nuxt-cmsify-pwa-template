<template>
  <div>
    <span class="sf-alert__message">
      <b>
        {{ elementType }}<i> {{ getElementType }} </i>
      </b>
      is not implemented yet!
    </span>
  </div>
</template>

<script>
export default {
  name: 'CmsNoComponent',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    elementType() {
      if (this.content.pageId) {
        return 'Section'
      }
      return this.content.sectionId ? 'Block' : 'Slot'
    },
    getElementType() {
      return this.content ? this.content.type : ''
    },
  },
}
</script>
