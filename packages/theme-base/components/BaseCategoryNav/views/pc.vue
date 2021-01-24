<template>
  <div class="base-category-nav">
    <v-tabs v-model="active" align-with-title background-color="transparent">
      <v-tab
        v-for="(v, i) in categories"
        :key="i"
        @mouseover="handleTabChange(i)"
        >{{ v.name }}{{ i + 1 }}</v-tab
      >
    </v-tabs>
  </div>
</template>

<script>
import { ref, computed } from '@nuxtjs/composition-api'
export default {
  name: 'BaseCategoryNavPc',
  props: {
    // 分类数据
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup({ data }) {
    const categories = ref(data)
    const active = ref(0)
    const inActive = ref(false)
    const subActiveCategories = computed(() => {
      return (
        (categories.value[active.value] &&
          categories.value[active.value].children) ||
        []
      )
    })

    const handleTabChange = (i) => {
      active.value = i
      inActive.value = true
    }

    return {
      inActive,
      active,
      categories,
      subActiveCategories,
      handleTabChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.base-category-nav {
  position: relative;
  &__sub {
    position: absolute;
    width: 100vw;
    min-height: 100px;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    background-color: #fff;

    &__tabs {
      &__item {
        margin-right: 15px;
        padding: 15px;
        border-right: 1px solid #ccc;
      }
    }
  }
}
</style>
