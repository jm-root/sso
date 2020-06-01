# 单点登陆 sso

单点登陆系统, 用于令牌管理

## Features

- 令牌生成
- 令牌删除
- 令牌校验
- 令牌续期

## 服务说明
- 服务基于[`jm-server`](https://github.com/jm-root/server/tree/master/packages/jm-server)框架建立
- 令牌生成方式有：md5、sha256、sm3
- 数据库使用redis存储
- 需要开启操作事件监听, 可通过gateway配置参数开启, 需与[`mq`](https://github.com/jm-root/mq)服务搭配使用
    - 事件监听有: ['sso.signon','sso.touch','sso.signout','sso.signout.id']
- 搭配使用服务
    - [gateway](https://github.com/jm-root/gateway)(网关服务,代理其它服务接口调用)
    - [passport](https://github.com/jm-root/passport)(该服务将通过gateway服务调用sso服务相应接口实现账号登录功能,详细说明请看passport服务)
    - [mq](https://github.com/jm-root/mq)(消息队列服务)

## 详细API
API文档请参见：[swagger文档](http://apidoc.jamma.cn/?urls.primaryName=sso%201.0)

## 构建运行
````
// 安装依赖包
lerna bootstrap
// 项目启动
npm run start
````

## 部署

采用docker部署，容器默认监听80端口

docker镜像: `jamma/sso`

```bash
// 请用自己的redis url 替换 localhost
docker run -d name sso  -e redis=redis://localhost jamma/sso
```

## 环境变量

### jm-server

请参考 [jm-server](https://github.com/jm-root/server/tree/master/packages/jm-server)

### jm-sso

| 配置项        | 默认值           | 描述 |
| :---          | :---:           | :--- |
|redis          |                 |必填, redis数据库连接地址, 如:redis://localhost|
|token_key      |"sso:token"      |Redis数据库token主键|
|id_key         |"sso:id"         |Redis数据库id主键|
|token_expire   |7200             |Token 过期时间, 单位秒(可选, 默认7200秒)|
|enable_id      |false            |是否支持ID, 为true时, 支持查询及删除指定id的所有token|
|secret         |""               |密钥|
|hash           |"sha256"         |密码哈希算法, 支持sha256, md5, sm3|

### jm-sso-mq

| 配置项        | 默认值           | 描述 |
| :---          | :---:           | :--- |
|gateway        |                 |选填, Gateway服务器Uri, 如果配置了此参数，自动启用jm-user-mq |

### jm-server-jaeger

| 配置项        | 默认值           | 描述 |
| :---          | :---:           | :--- |
|service_name   |"sso"            | 链路追踪登记的服务名称 |
|jaeger         |                 |选填,jaeger服务器Uri 链路追踪服务器 |

