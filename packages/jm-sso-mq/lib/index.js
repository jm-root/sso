const log = require('jm-log4js')
const logger = log.getLogger('sso-mq')
const { Service } = require('jm-server')

class $ extends Service {
  constructor (opts, app) {
    super(opts)
    const { gateway } = opts
    const { sso } = app.modules

    if (!gateway) {
      logger.warn('no gateway config. I will not work.')
      return
    }

    if (!sso) {
      logger.warn('no sso module found. I will not work.')
      return
    }

    require('./gateway')({ gateway }).then(doc => {
      doc.bind('mq')
      this.gateway = doc
      this.emit('ready')
    })

    sso
      .on('signon', opts => {
        opts && (this.send('sso.signon', opts))
      })
      .on('touch', opts => {
        opts && (this.send('sso.touch', opts))
      })
      .on('signout', opts => {
        opts && (this.send('sso.signout', opts))
      })
  }

  async send (topic, message) {
    await this.onReady()
    const msg = `topic: ${topic} message: ${JSON.stringify(message)}`
    try {
      logger.debug(`send mq. ${msg}`)
      await this.gateway.mq.post(`/${topic}`, { message })
    } catch (e) {
      logger.error(`send mq fail. ${msg}`)
      logger.error(e)
    }
  }
}

module.exports = function (opts, app) {
  return new $(opts, app)
}
