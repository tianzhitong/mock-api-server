<!--
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-22 23:04:56
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-26 22:18:48
 * @FilePath: /mock-api-serve/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# docker 构建镜像
docker build -t mock-api-server:v5 .
# 构建镜像
docker build .
# 运行镜像
docker run -d -p 3000:3000 --name my-nest-mock-server2 mock-api-server:v5

# 启动docker-compose
docker-compose up -d

# 删除全部容器
docker rm -f $(docker ps -aq)

# 进入容器内
docker exec -it 3cbdd3a40b64 /bin/bash
docker exec -it 3cbdd3a40b64 bash











# centos安装docker

# 卸载docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
# 安装依赖工具
sudo yum install -y yum-utils

# 设置docker仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

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
