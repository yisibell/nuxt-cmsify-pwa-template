# cms

页面内容管理模块。

# Structure

``` js
const page = {
  // 资源类型
  // frontend.navigation.page 分类导航页，该页面由 cms 定义
  // frontend.detail.page 商品详情页，该页面不可被 cms 定义
  resourceType: 'frontend.navigation.page',
  id: 1, // 页面 id
  cmsPage: {
    sections: [
      {
        id: 1, // section id
        pageId: 1, // 页面 id
        type: 'default', // section 类型
        blocks: [
          {
            sectionId: 1, // 父级 section id
            id: 1, // 当前 block id
            type: 'text', // block 类型
            slots: [ // 插槽列表
              {
                slot: 'content', // 插槽名
                type: 'text', // element 类型
                config: {}, // 插槽配置
                data: { // 传递给 element 的数据
                  msg: `section id: ${sectionId}, block id: ${id} -> this is a text Element`,
                },
              },

              // more slot...
            ],
          },

          // more block...
        ]
      },
      // more section...
    ]
  }
}
```

## page

页面。

### section

页面分段。

### block

段内分块。

### element

元素组件。
