FROM jamma/node
MAINTAINER Jeff YU, jeff@jamma.cn
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org -g
RUN yarn --prod && yarn cache clean
