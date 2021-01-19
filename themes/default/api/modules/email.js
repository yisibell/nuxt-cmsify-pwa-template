export default (request) => ({
  // mjml 编译（nodejs 服务常规版）
  mjml2html(data, options = { fonts: {}, minify: true }) {
    return request(
      {
        url: `/edm/api/htmlemail/create`,
        method: 'post',
        data: {
          data,
          options,
        },
      },
      {
        dataType: 'json',
      }
    )
  },
})
