<!--
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-22 23:04:56
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-26 20:52:31
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


docker exec -it c820ccddb9d8 /bin/bash
