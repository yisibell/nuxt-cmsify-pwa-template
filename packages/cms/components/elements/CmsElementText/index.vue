<template>
  <div class="cms-element-text">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'CmsElementText',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    msg() {
      const { data } = this.content
      return data.msg
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-element-text {
  border: 2px solid purple;
  padding: 15px;
}
</style>
