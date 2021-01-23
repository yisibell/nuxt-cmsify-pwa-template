export default (request) => ({
  // 获取站点配置
  get() {
    return request({
      url: 'http://yapi.opvalue.com/mock/59/api/domains/veryvoga/config',
      method: 'get',
    })
  },
})
