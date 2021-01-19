# PAGES

This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and creates the router of your application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).

# 说明

## 匹配方式

- **_.vue** 动态路由页面，用来匹配被 **cms** 配置的页面。

- 其他页面均为固定页面，不支持 **cms** 配置页面内容。

- **_lang** 多语言动态路由页面。

示例1：匹配 `German(de-DE)` 语言的页面。

`https://test.com/de-DE/search`

示例2：匹配 `English(en-EN)` 语言的页面。

`https://test.com/en-EN/search`

示例3：匹配默认语言的页面。

`https://test.com/search`

## 页面组件内

我们可以在页面组件内的 `asyncData` 钩子中获取到 `ctx.params.lang`。

``` js
export default {
  asyncData({ params }) {
    console.log(params)
    // { lang: en-EN, pathMatch: 'home' }
  }
}
```

然后对该页面做些多语言的处理。