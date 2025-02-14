<!--
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-22 23:04:56
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-14 01:58:05
 * @FilePath: /mock-api-serve/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 本地开发执行的docker命令
docker run --name mock-mysql \
    -p 3306:3306 \
    -v /Users/tianzhitong/Desktop/docker-volomes/mysql:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -d mysql:latest


docker run --name mock-redis \
    -v /Users/tianzhitong/Desktop/docker-volomes/redis:/data \
    -p 6379:6379 \
    -d redis:6

# 生产部署
将此项目扔到服务器上，确保服务器安装docker
使用docker部署项目
运行命令：docker compose up -d

# 以下是 centos安装docker。卸载旧docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 删除现有的 Docker 仓库配置：
sudo rm /etc/yum.repos.d/docker-ce.repo

# 安装依赖工具
sudo yum install -y yum-utils

# 设置docker仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装docker
sudo yum install docker-ce docker-ce-cli containerd.io

# 启动docker
sudo systemctl start docker
sudo systemctl enable docker

# 查看版本
sudo docker --version

# 修改镜像地址

sudo mkdir -p /etc/docker

# 修改镜像地址
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
    ]
}
EOF

# 重启docker服务
sudo systemctl daemon-reload && sudo systemctl restart docker



# 以下是docker基础使用的命令
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 5af5f7a5d58f
docker inspect 5af5f7a5d58f | grep Network

# 进入容器  
docker exec -it 00fea99ea580 /bin/sh

# 上传文件到服务器
scp -r ./docker-compose.swarm.yml root@1.95.80.219:/mock-app-server
scp -r ./restart_service.sh root@1.95.80.219:/mock-app-server

# docker 构建镜像
docker build -t mock-api-server:test .

# 构建镜像
docker build .

# 运行镜像
docker run -d -p 3000:3000 --name my-nest-mock-server2 mock-api-server:test

# 指定网络
docker run -d --name mock-api-server-test --network nestjs-network mock-api-server:test

# 启动docker-compose
docker-compose up -d

# 删除所有volume
docker volume ls -q | xargs -r docker volume rm

# 删除全部容器
docker rm -f $(docker ps -aq)

# 删除所有镜像
docker rmi -f $(docker images -aq)

# 删除未使用的镜像
docker image prune


# 打包镜像
docker build . -t=mock-app-server

# 打tag 本地镜像 -> 远程仓库镜像
docker tag mock-app-server:latest tianzhitong/mock-app-server:latest
docker push tianzhitong/mock-app-server:latest

# 查看镜像架构
docker inspect 【镜像id】 --format '{{.Architecture}}'

# 查看服务器架构
docker info --format '{{.Architecture}}'

# 构建并推送多架构镜像：
docker buildx build --platform linux/amd64,linux/arm64 -t tianzhitong/mock-app-server:1.0.2 --push .
docker buildx build --platform linux/amd64,linux/arm64 -t tianzhitong/mock-app-server:1.0.1 --output type=image .


docker buildx build --platform linux/amd64 -t wang-bo-project:1.0.0 --output type=image .
docker buildx build --platform linux/amd64 -t wang-bo-project:1.0.1 --output type=tar,dest=wangbo.tar .

docker buildx build \
  --platform linux/amd64 \
  --cache-from=type=local,src=/Users/tianzhitong/Desktop/mock-api/mock-api-serve/cache \
  --cache-to=type=local,dest=/Users/tianzhitong/Desktop/mock-api/mock-api-serve/cache \
  -t tianzhitong/mock-app-server:latest --push .


# 保存镜像到本地
docker save -o my-image.tar mock-app-build:latest
docker load -i /path/to/my_image.tar

  
# 解决跨平台架构问题 1-启用qemu 2-构建多架构
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# 拉取指定服务
docker compose pull <service_name>
# 重启服务
docker compose up -d --no-deps <service_name>


# 创建 Buildx 构建器
docker buildx create --name mybuilder --use

# 激活 Buildx
docker buildx use mybuilder

# 查看构建器状态
docker buildx inspect

# shell脚本更新服务
touch restart_service.sh
chmod +x restart_service.sh
./restart_service.sh



# -----------------------swarm使用--------------------------
# 初始化 Docker Swarm 集群
docker swarm init

# 使用 docker stack deploy 部署服务
docker stack deploy -c ./docker-compose.swarm.yml mock-server-stack

# 查看部署状态
docker stack services mock-server-stack
docker stack rm mock-server-stack
docker service ps mock-server-stack_app

# 扩展服务
docker service scale mock-server-stack_app=3

# 回滚更新
docker service rollback mock-server-stack_app
# 删除堆栈
docker stack rm mock-server-stack

# 更新单个服务
docker service update \
  --image tianzhitong/mock-app-server:latest \
  mock-server-stack_app

# 重启单个服务
docker service update --force mock-server-stack_app

# 监控更新状态
docker service ps mock-server-stack_app

# 查看 Stack 列表
docker stack ls
docker stack services mock-server-stack
docker stack ps mock-server-stack
docker stack rm mock-server-stack

# 生成ssh key文件
1.生成
  ssh-keygen -t rsa -b 4096 -C "laotianwy@163.com"
2.公钥扔到服务器
  ssh-copy-id -i ./access_ssh.pub root@1.95.80.219
3.私钥扔到仓库


# 删除本机内公钥访问的服务器
nano ~/.ssh/authorized_keys
nano ~/.ssh/config
nano ~/.ssh/known_hosts
