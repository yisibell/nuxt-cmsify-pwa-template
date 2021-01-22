import qs from 'qs'
import axios from 'axios'
import apiRespository from '~~/packages/api'

// Axios.prototype cannot be modified
const axiosExtra = {
  setBaseURL(baseURL) {
    this.defaults.baseURL = baseURL
  },
  setHeader(name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name]
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken(token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use((config) => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use((response) => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(
      undefined,
      (error) => fn(error) || Promise.reject(error)
    )
  },
  onResponseError(fn) {
    this.interceptors.response.use(
      undefined,
      (error) => fn(error) || Promise.reject(error)
    )
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  },
}

const extendAxiosInstance = (axios) => {
  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

const createAxiosInstance = (ctx) => {
  const { redirect, store, env, app } = ctx
  const { NUXT_APP_BASE_API } = env
  const isClient = process.client

  const axiosInstance = axios.create({
    baseURL: NUXT_APP_BASE_API,
    timeout: 50000,
  })

  // Extend axios proto
  extendAxiosInstance(axiosInstance)

  // 请求拦截
  axiosInstance.onRequest((config) => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      config.headers.Authorization = `${store.getters.token}`
    }

    return config
  })

  // 请求错误处理
  axiosInstance.onRequestError((err) => {
    console.error('[Request Error]：', err)
  })

  // 响应拦截
  axiosInstance.onResponse((res) => {
    const { data } = res
    const { code, msg } = data

    if (![200, 201].includes(code)) {
      console.error('[Response Error Data]:', data)
      isClient && app.$toast.global.info(msg || 'error')
    }

    return data
  })

  // 响应错误处理
  axiosInstance.onResponseError((err) => {
    const { parseInt } = Number
    const code = parseInt(err.response && err.response.status)

    console.error('[HTTP Response Error Info]:', err)

    if ([400, 404].includes(code)) {
      redirect('/404')
    }
  })

  return axiosInstance
}

// 创建 service
const createService = (axiosInstance, ctx) => (
  option,
  { dataType = 'json', mock = false } = {}
) => {
  const { env } = ctx
  const { NUXT_APP_MOCK_API } = env

  if (mock && NUXT_APP_MOCK_API) {
    option.url = `${NUXT_APP_MOCK_API}${option.url}`
  }

  if (dataType === 'formData') {
    // 发送 formData 数据格式
    axiosInstance.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    option.data = qs.stringify(option.data)
  } else if (dataType === 'formData2') {
    // 含文件
    axiosInstance.setHeader('Content-Type', 'multipart/form-data')
  }

  return new Promise((resolve, reject) => {
    axiosInstance(option).then(resolve).catch(reject)
  })
}

export default (ctx, inject) => {
  // axios instance
  const axiosInstance = createAxiosInstance(ctx)
  // 二次包装请求方法
  const service = createService(axiosInstance, ctx)

  // 依赖注入
  inject('api', apiRespository(service))
}
