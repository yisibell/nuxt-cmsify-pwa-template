import user from './modules/user'
import email from './modules/email'

export default (request) => ({
  user: user(request),
  email: email(request),
})
