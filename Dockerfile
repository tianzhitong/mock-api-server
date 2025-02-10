# 使用 Node.js 官方镜像作为基础镜像
FROM node:20-alpine AS builder
 
# 设置工作目录
WORKDIR /app
 
# 复制 package.json 和 package-lock.json
COPY package.json pnpm-lock.yaml ./

# 更新包列表并安装 OpenSSL。解决prisma报错问题
# RUN apt-get update -y && apt-get install -y openssl

# 更换为淘宝镜像，合并命令减少层数，设置镜像并安装 PNPM
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm install

# 复制项目文件到容器内
COPY . .

# 确保依赖已安装后再执行脚本
RUN node yaml_to_env.mjs && \
    npx prisma generate && \
    pnpm build

# production stage
FROM node:20-alpine AS production-stage

# 设置工作目录
WORKDIR /mock-app

# 复制构建好的文件
COPY --from=builder /app/dist /mock-app/dist
COPY --from=builder /app/prisma /mock-app/prisma
COPY --from=builder /app/package.json /mock-app/package.json
COPY --from=builder /app/pnpm-lock.yaml /mock-app/pnpm-lock.yaml
COPY --from=builder /app/.env /mock-app/.
COPY --from=builder /app/ecosystem.config.js /mock-app/ecosystem.config.js
# COPY --from=builder /app/node_modules/@prisma/.client /mock-app/node_modules/@prisma/.prisma


# 生产依赖安装及清理
RUN npm config set registry https://registry.npmmirror.com
# 安装 pnpm
RUN npm install -g pnpm
# 安装 pm2
RUN npm install -g pm2
# 安装项目依赖
RUN pnpm install --production
# 生成 prisma 客户端
RUN npx prisma generate

# 暴露端口（如果你的应用运行在特定端口）
EXPOSE 3000

# CMD ["sh", "-c", "pnpm migrate:deploy && pnpm start:prod"]
ENTRYPOINT sh -c "pnpm migrate:deploy & pm2-runtime start ecosystem.config.js"

