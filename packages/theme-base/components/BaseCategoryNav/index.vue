<template>
  <component :is="isComponent" :data="data" />
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import BaseCategoryNavPc from './views/pc'
export default {
  name: 'BaseCategoryNav',
  components: {
    BaseCategoryNavPc,
  },
  props: {
    type: {
      type: String,
      default: 'pc',
    },
    // 分类数据
    data: {
      type: Array,
      default: () => [
        {
          name: 'Item',
          id: 1,
          children: [
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
          ],
        },
        {
          name: 'Item',
          id: 2,
          children: [
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 5, icon: 'mdi-email' },
                { name: 'sub item', id: 6, icon: 'mdi-email' },
                { name: 'sub item', id: 7, icon: 'mdi-email' },
                { name: 'sub item', id: 8, icon: 'mdi-email' },
              ],
            },
            {
              type: 'image',
              children: [
                {
                  name: 'sub item',
                  id: 9,
                  src: 'https://picsum.photos/500/300?image=1',
                },
              ],
            },
          ],
        },
        {
          name: 'Item',
          id: 3,
          children: [
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 13, icon: 'mdi-call-split' },
                { name: 'sub item', id: 14, icon: 'mdi-call-split' },
                { name: 'sub item', id: 15, icon: 'mdi-call-split' },
                { name: 'sub item', id: 16, icon: 'mdi-call-split' },
              ],
            },
          ],
        },
        {
          name: 'Item',
          id: 4,
          children: [
            {
              type: 'text',
              children: [
                { name: 'sub item', id: 17, icon: 'mdi-folder' },
                { name: 'sub item', id: 18, icon: 'mdi-folder' },
                { name: 'sub item', id: 19, icon: 'mdi-folder' },
                { name: 'sub item', id: 20, icon: 'mdi-folder' },
              ],
            },
          ],
        },
      ],
    },
  },
  setup({ data, type }) {
    const isComponent = computed(() => {
      if (type === 'pc') return 'BaseCategoryNavPc'
      else return ''
    })

    return {
      isComponent,
    }
  },
}
</script>
