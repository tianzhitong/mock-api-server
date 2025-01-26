# 使用 Node.js 官方镜像作为基础镜像
FROM node:23.6.1-alpine3.20
 
# 设置工作目录
WORKDIR /app
 
# 复制 package.json 和 package-lock.json
COPY package*.json pnpm-lock.yaml ./

# 更换为淘宝镜像
RUN npm config set registry https://registry.npmmirror.com
# 安装 pnpm
RUN npm install -g pnpm
# 安装项目依赖
RUN pnpm install

# 复制项目文件到容器内
COPY . .

# 生成 prisma 客户端
RUN npx prisma generate
# 构建项目
RUN pnpm build

# 暴露端口（如果你的应用运行在特定端口）
EXPOSE 3000

ENTRYPOINT pnpm migrate:deploy && pnpm start:prod
