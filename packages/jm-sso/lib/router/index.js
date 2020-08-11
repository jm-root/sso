const { ms } = require('jm-server')

/**
 * @apiDefine Error
 *
 * @apiSuccess (Error 200) {Number} err 错误代码
 * @apiSuccess (Error 200) {String} msg 错误信息
 *
 * @apiExample {json} 错误:
 *     {
 *       err: 错误代码
 *       msg: 错误信息
 *     }
 */

module.exports = function (service) {
  const router = ms.router()

  async function signon (opts = {}) {
    return service.signon(opts.data)
  }

  async function signout (opts = {}) {
    const id = opts.params.id
    const clientId = opts.data.clientId
    return id ? service.clearTokenById(id, clientId) : service.signout(opts.token)
  }

  async function verify (opts = {}) {
    return service.verify(opts.token)
  }

  async function touch (opts = {}) {
    return service.touch(opts.token, opts.data)
  }

  function filterToken (opts) {
    const { data, headers } = opts
    data && data.token && (opts.token = data.token)
    headers && headers.authorization && (opts.token = headers.authorization)
  }

  router
    .add('/signon', 'post', signon)
    .use(filterToken)
    .add('/signout', 'get', signout)
    .add('/signout/:id', 'get', signout)
    .add('/verify', 'get', verify)
    .add('/touch', 'get', touch)
    .add('/touch', 'put', touch)
    .add('/touch', 'post', touch)

  return router
}
