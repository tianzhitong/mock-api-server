/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 00:05:38
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 00:16:23
 * @FilePath: /mock-api-serve/src/setup-swagger.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const setupSwagger = (app: INestApplication, configService: ConfigService) => {
    const { enabled, path } = configService.get('swagger');

    if (!enabled) return;

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
    // 生成的openai数据写入到本地项目
    writeFileSync(join(process.cwd(), 'openApi.json'), JSON.stringify(document, null, 2));
    // 设置 Swagger 模块的路径和文档对象，将 Swagger UI 绑定到 '/api-doc' 路径上
    SwaggerModule.setup(path, app, document, {
        jsonDocumentUrl: 'swagger/json',
    });

    console.log(`Swagger UI available at ----> http://localhost:${configService.get<number>('app.port')}/${path}`);
};
