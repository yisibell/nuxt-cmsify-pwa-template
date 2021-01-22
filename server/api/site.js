const axios = require('axios')

const getSiteConfig = () => {
  return axios.get(
    'http://yapi.opvalue.com/mock/59/api/domains/veryvoga/config'
  )
}

module.exports = {
  getSiteConfig
}
