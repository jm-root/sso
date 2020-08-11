const { Service } = require('jm-server')
const log = require('jm-log4js')
const { arg2bool } = require('jm-utils')
const logger = log.getLogger('acl')
const TokenMan = require('./tokenMan')
const t = require('../locale')
const { TokenKey, IdKey, TokenExpire } = require('../consts')

module.exports = class extends Service {
  constructor (opts = {}) {
    super(opts)
    let v = ['enable_id']
    v.forEach(function (key) {
      const value = opts[key]
      value !== undefined && (opts[key] = arg2bool(value))
    })

    const {
      debug,
      redis,
      token_key: tokenKey = TokenKey,
      token_expire: tokenExpire = TokenExpire,
      enable_id: enableId = false,
      id_key: idKey = IdKey,
      secret = '',
      hash = 'sha256'
    } = opts

    opts = {
      debug,
      redis,
      tokenKey,
      tokenExpire,
      enableId,
      idKey,
      secret,
      hash,

      t
    }

    Object.assign(this, opts)

    debug && (logger.setLevel('debug'))

    this.tokenMan = new TokenMan(opts)
    this.tokenMan.redis.on('ready', () => {
      this.emit('ready')
    })
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }

  /**
   * 登记, 并返回登记信息
   * @param {Object} opts
   * @example
   * opts参数:{
   *  id: user id
   *  token: token(可选)
   *  expire: token过期时间(可选)
   * }
   * @returns {Promise<*>}
   */
  async signon (opts = {}) {
    this.emit('beforeSignon', opts)
    const doc = await this.tokenMan.add(opts)
    this.emit('signon', doc)
    return doc
  }

  /**
   * 延长有效期, 并返回登记信息
   * @param token
   * @param opts
   * @returns {Promise<*>}
   */
  async touch (token, opts = {}) {
    const doc = await this.tokenMan.touch(token, opts)
    this.emit('touch', doc)
    return doc
  }

  /**
   * 登出, 并返回登记信息
   * @param token
   * @returns {Promise<*>}
   */
  async signout (token) {
    const doc = await this.tokenMan.verify(token)
    await this.tokenMan.delete(token)
    this.emit('signout', doc)
    return doc
  }

  /**
   * 清空指定id下所有token
   * @param id
   * @param clientId
   * @returns {Promise<void>}
   */
  async clearTokenById (id, clientId = '') {
    const tokens = await this.tokenMan.deleteById(id, clientId)
    this.emit('signout.id', { id, tokens })
    return {
      id,
      clientId,
      tokens
    }
  }

  /**
   * 验证Token是否有效, 并返回登记信息
   * @param {String} token
   * @returns {Promise<void>}
   */
  async verify (token) {
    return this.tokenMan.verify(token)
  }
}
