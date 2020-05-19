const Redis = require('ioredis')

module.exports = function ({ redis = {} } = {}) {
  return new Redis(redis)
}
