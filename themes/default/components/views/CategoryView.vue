<template>
  <div>
    <cms-page :content="cmsPage" />
  </div>
</template>

<script>
export default {
  name: 'CategoryView',
  props: {
    cmsPage: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
