import site from './modules/site'

export default (request) => ({
  site: site(request),
})
