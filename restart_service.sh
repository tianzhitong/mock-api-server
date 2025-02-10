#!/bin/bash

# 拉取最新镜像
docker service update \
  --image tianzhitong/mock-app-server:latest \
  mock-server-stack_app

echo "服务已重启。"