#!/bin/bash
# 检查是否传递了镜像标签参数
if [ -z "$1" ]; then
  echo "错误：未提供镜像标签参数。"
  exit 1
fi

IMAGE_TAG=$1
SERVICE_NAME="mock-server-stack_app"

# 拉取远程镜像
echo "正在拉取远程镜像 $IMAGE_TAG..."
docker pull $IMAGE_TAG
echo "拉取远程镜像成功..."

# 更新服务镜像
echo "正在更新服务 $SERVICE_NAME 的镜像为 $IMAGE_TAG..."
docker service update \
  --image $IMAGE_TAG \
  $SERVICE_NAME

echo "服务已重启。"