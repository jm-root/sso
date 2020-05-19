# jm-sso

single sign on

## config

基本配置 请参考 [jm-server] (https://github.com/jm-root/jm-server)

redis [] Redis数据库uri

token_key ['sso:token'] Redis数据库token主键

token_expire [7200] Token 过期时间, 单位秒(可选, 默认7200秒)

enable_id [false] 是否支持ID, 为true时, 支持查询及删除指定id的所有token

id_key ['sso:id'] Redis数据库id主键

secret [''] 密钥

hash ['sha256'] 密码哈希算法, 支持sha256, md5, sm3