module.exports = {
  appenders: {
    console: { type: 'console' },
    sso: {
      type: 'dateFile',
      filename: 'logs/sso',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'info' },
    sso: { appenders: [ 'console', 'sso' ], level: 'info' }
  }
}
