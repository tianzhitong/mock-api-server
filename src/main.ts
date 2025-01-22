/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 20:42:21
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 00:13:26
 * @FilePath: /mock-api-serve/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import * as fastifyRateLimit from '@fastify/rate-limit';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        cors: true,
        bufferLogs: true,
    });

    // 管道 whitelist-不想包含未定义的属性
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    // 作用就是可以让自定义校验器可以支持依赖注入
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    // 更换日志系统
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    // 读取环境配置
    const envConfig = app.get(ConfigService);

    // 获取端口号
    const PORT = envConfig.get<number>('app.port') ?? 8080;

    // 启用接口限制器
    app.register(fastifyRateLimit, {
        max: 1000,
        timeWindow: '15 minute',
    });

    // 启用全局接口前缀
    app.setGlobalPrefix('mock');

    // 根据环境判断是否启用swagger文档
    setupSwagger(app, envConfig);

    await app.listen(PORT);
}
bootstrap();
