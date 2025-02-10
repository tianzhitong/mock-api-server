#!/bin/bash

# 设置变量
CONTAINER_NAME="nestjs_app"
SERVICE_NAME="app"

# 拉取最新镜像
echo "拉取最新服务..."
docker compose pull $SERVICE_NAME

# 检查容器是否正在运行
# if [ $(docker ps -q -f name=$CONTAINER_NAME) ]; then
#     echo "停止并删除现有的容器..."
#     docker stop $CONTAINER_NAME
#     docker rm $CONTAINER_NAME
# fi

# 启动新容器
echo "启动新容器..."
docker compose up -d --no-deps $MICRO_NAME

echo "服务已重启。"