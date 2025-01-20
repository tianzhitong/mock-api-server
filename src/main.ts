/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 20:42:21
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 14:16:07
 * @FilePath: /mock-api-serve/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    // 允许跨域
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    // 启用全局前缀
    app.setGlobalPrefix('mock');

    // Swagger 配置
    const config = new DocumentBuilder()
        .setTitle('Mock API') // 标题
        .setDescription('The Mock API description') // 描述
        .setVersion('1.0') // api版本
        .addTag('MOCK') // 标签
        .addCookieAuth('connect.sid') // 添加 Cookie 认证方式，名称为 'connect.sid'
        .addBearerAuth({
            // 添加 Bearer 认证方式，类型为 'http'，认证方案为 'bearer'
            type: 'http',
            scheme: 'bearer',
        })
        .build();
    // 使用配置对象创建 Swagger 文档
    const document = SwaggerModule.createDocument(app, config);
    // 设置 Swagger 模块的路径和文档对象，将 Swagger UI 绑定到 '/api-doc' 路径上
    // http://localhost:3000/api-doc
    SwaggerModule.setup('api-doc', app, document, {
        // jsonDocumentUrl: 'swagger/json',
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
