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
