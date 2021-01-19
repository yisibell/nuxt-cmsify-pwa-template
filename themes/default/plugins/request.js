import qs from 'qs'
import apiRespository from '~/api'

export const createService = (axiosInstance, ctx) => (
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
  const { $axios, redirect, store, env, app } = ctx
  const { NUXT_APP_BASE_API } = env
  const isClient = process.client

  const axiosInstance = $axios.create({
    baseURL: NUXT_APP_BASE_API,
    timeout: 50000,
  })

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

  // 二次包装请求方法
  const service = createService(axiosInstance, ctx)

  // 依赖注入
  inject('api', apiRespository(service))
}
