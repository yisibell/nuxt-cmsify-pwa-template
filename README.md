# nuxt-starter-template

A Nuxt + vuetify starter template.

# Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build:prod
$ npm run start

# build for ft and launch server
$ npm run build:ft
$ npm run start

# launch server with pm2
npm run pm2:start

# generate static project
$ npm run generate
```

打开浏览器预览：**localhost:3000/**。

# Features

## 友好的**开发**、**正式生产** 和 **测试生产** 环境区分，基于 `@nuxtjs/dotenv` 设计。

在项目根目录下，有 3 个 `env` 文件，分别为：

`.env.development` 开发模式下的环境变量文件。
`.env.ft` **ft** 测试环境下的环境变量文件。
`.env.production` 正式环境下的环境变量文件。

你可以在不同的环境变量文件中设置一些某个环境特定的变量，比如，数据接口的主机地址 `NUXT_APP_BASE_API`。

在测试环境下，她长这样：

``` shell
# development env

# 请求基地址
NUXT_APP_BASE_API = 'http://ft-some-host.com/api'
```

在正式环境下，变成这样：

``` shell
# production env

# 请求基地址
NUXT_APP_BASE_API = 'http://some-host.com/api'
```

这样配置后，当前环境下的所有环境变量都会被设置到 **nuxt 应用** 的 `context.env` 对象下。

这里的 `NUXT_APP_BASE_API` 就被应用为 `@nuxtjs/axios` 实例的 `baseURL`。具体可查看 `~/plugins/request.js` 中的实现。

## 组织清晰的 `api` 接口封装，基于 `@nuxtjs/axios` 设计。

为了方便的在项目中调用 `api` 接口，并且方便维护，该模板设计，封装了 `api` 目录和 `request` 插件。

### **api目录**

1. `~/api/modules` 数据接口模块，该文件夹下存放按模块划分的数据接口定义。

例：`~/api/modules/user.js`

``` js
// 用户模块

export default (request) => ({
  // 获取用户列表
  index(params) {
    return request({
      url: `/user`,
      method: 'get',
      params,
    })
  },
  // 新建用户
  create(data) {
    return request({
      url: `/user`,
      method: 'post',
      data,
    })
  },
  // 删除用户
  del(id) {
    return request({
      url: `/user/${id}`,
      method: 'delete',
    })
  },
  // 修改用户
  update(id, data) {
    return request({
      url: `/user/${id}`,
      method: 'put',
      data,
    })
  },
})
```

如上所示，`user.js` 模块默认导出一个函数，该函数接收一个 `request` 参数 （在 `~/plugins/request.js` 中被传入）。
然后，需要导出一个对象，该对象内就是该数据模块的各类接口定义。


2. `~/api/index.js` 数据接口仓库整合导出。

例：

``` js
import user from './modules/user'
import email from './modules/email'

export default (request) => ({
  user: user(request),
  email: email(request),
})
```

### **request插件**

`~/plugins/request.js` 全局数据接口调用方式封装。

**特性：**

- 拥有 `请求拦截` 、`响应拦截` 、`请求错误处理` 和 `响应错误处理`。

- 不同环境下，拥有不同的请求基地址 `baseURL`。

- 扩展了请求方法的 **第二配置**。

例：

``` js
// 正常的 axios 请求调用
axios({
  url: '/some/path',
  method: 'get'
})

// 封装过后的 request 请求调用

// 发送 formData 格式数据
request({
  url: '/some/path',
  method: 'post'，
  data: {
    name: 'elenh',
    age: 18
  }
}, {
  dataType: 'formData'
})

// 发送含文件的 formData 格式数据
const data = new FormData()
const file = null // 文件

data.append('file' file)
data.append('other', 'test')

request({
  url: '/some/path',
  method: 'post'，
  data
}, {
  dataType: 'formData2'
})

// 使用 mock 接口
// 将 mock 设置为 true 后，将使用当前环境 .env.* 文件设置的 NUXT_APP_MOCK_API 值作为请求基地址
// 可配合像 yapi 这样的接口 mock 服务使用
request({
  url: '/some/path',
  method: 'post'，
  data
}, {
  mock: true
})

```

- 一次注入，随处可用

我们把 **api仓库** 以 `api` 为键名注入到了 **nuxt** 应用中。

``` js
// ~/plugins/request.js

// api 仓库
import apiRespository from '~/api'

// 忽略其他 ...

export default (ctx, inject) => {
  const { $axios, redirect, store, env } = ctx
  const { NUXT_APP_BASE_API } = env

  const axiosInstance = $axios.create({
    baseURL: NUXT_APP_BASE_API,
    timeout: 50000,
  })

  // ...

  // 二次包装请求方法
  const service = createService(axiosInstance, ctx)

  // 依赖注入
  inject('api', apiRespository(service))
}
```

然后，我们可以在 **.vue** 文件中这样使用：

``` js
export default {
  name: 'Test',
  async asyncData({ app }) {
    const { code, data } = await app.$api.user.index()
    if (code === 200) {
      return {
        data
      }
    }
  },
  async mounted() {
    const res = await this.$api.user.index()
    console.log(res)
  }
}
```

在 **store** 中的 `actions` 中这样使用：

``` js
// ~/store/user.js

export const actions = {
  async getUserList() {
    const { code, data } = await this.$api.user.index()
    if (code === 200) {
      return data
    }
    return []
  }
}
```

> 注：当然你也可以在 **mutations** 中访问到 `this.$api`，但不建议将异步处理放置在 **mutations** 中。

## vue-toasted 插件封装

该模板封装了 `vue-toasted` 插件，方便使用，且易于扩展其配置。定义文件位于 `~/plugins/vue-toasted.js`。

你可以在 `*.vue` 或 `store` 中的 `mutations` 、`actions` 中使用 `$toast`。

**1.使用方式示例：**

``` js
export default {
  mounted() {
    this.$toast.global.info('this is a info msg...')
    this.$toast.global.success('this is a success msg...')
    this.$toast.global.warning('this is a warning msg...')
    this.$toast.global.error('this is a error msg...')
    this.$toast.show('this is a default msg...', { duration: 4000 })
  }
}
```

**2.自定义 vue-toasted 样式：**

可在 `~/assets/styles/modules/vue-toasted-custom.scss` 中修改 `vue-toasted` 的相关样式。

## sprite svg icon

你可以在项目中很方便的使用自己的 `svg` 图标。

使用方式：

1. 将制作好的 `svg` 图标放置到 `~/assets/icons/svg` 文件夹下，推荐使用阿里的 `iconfont`。
2. 然后，你可以在 `*.vue` 的模板中这样用

``` html
<template>
  <div>
    <svg-icon icon-class="star" />
  </div>
</template>
```

这里的 `icon-class` 的值就是你放置在 `~/assets/icons/svg` 文件夹中的每个 `svg` 图标文件名。

可参考 <a href="https://github.com/yisibell/aidol-svg-icon" target="_blank"> @aidol/svg-icon </a> 的实现逻辑。

