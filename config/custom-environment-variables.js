module.exports = {
  token_key: 'tokenKey', // deprecated
  token_expire: 'tokenExpire', // deprecated
  service_name: 'service_name',
  modules: {
    'jm-server-jaeger': {
      config: {
        jaeger: 'jaeger'
      }
    },
    'sso': {
      config: {
        redis: 'redis',
        secret: 'secret',
        token_key: 'token_key',
        token_expire: 'token_expire',
        enable_id: 'enable_id'
      }
    },
    'jm-sso-mq': {
      config: {
        gateway: 'gateway'
      }
    }
  }
}
