# 单点登陆 sso

单点登陆系统

## 部署

采用docker部署，容器默认监听80端口

```bash
// 请用自己的redis url 替换 localhost
docker run -d name sso  -e redis=redis://localhost jamma/sso
```

## 环境变量

### jm-server

请参考 [jm-server](https://github.com/jm-root/ms/tree/master/packages/jm-server)

### jm-sso

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|redis| |必填, redis数据库uri|
|token_key|['sso:token']|Redis数据库token主键|
|token_expire|[7200]|Token 过期时间, 单位秒(可选, 默认7200秒)|
|enable_id|[false]|是否支持ID, 为true时, 支持查询及删除指定id的所有token|
|id_key|['sso:id']|Redis数据库id主键|
|secret|''|密钥|
|hash|[sha256]|密码哈希算法, 支持sha256, md5, sm3|

### jm-sso-mq

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|gateway|'http://gateway'|Gateway服务器Uri| jm-sso-mq 使用

### jm-server-jaeger

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|service_name|'sso'| 链路追踪登记的服务名称 |
|jaeger| |jaeger服务器Uri| 链路追踪服务器


## Features

- 存储 redis 
