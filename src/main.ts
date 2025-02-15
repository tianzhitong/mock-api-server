/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 20:42:21
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-15 17:42:58
 * @FilePath: /mock-api-serve/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { setupSwagger } from './setup-swagger';
import { LoggerService } from './share/logger/logger.service';
import { isDev } from './config';
import fastifyApp from './common/adapters/fastify.adapter';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyApp, {
        bufferLogs: true,
    });

    // 启用cors 浏览器端跨域访问接口数据
    app.enableCors({ origin: 'http://localhost', credentials: true });

    // 作用就是可以让自定义校验器可以支持依赖注入
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // 管道验证数据
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            // whitelist-不想包含未定义的属性
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
            errorHttpStatusCode: HttpStatus.BAD_REQUEST,
            stopAtFirstError: true,
            exceptionFactory(errors) {
                return new BadRequestException(
                    errors.map((e) => {
                        if (e.constraints && Object.keys(e.constraints).length > 0) {
                            const rule = Object.keys(e.constraints!)[0];
                            const msg = e.constraints![rule];
                            return msg;
                        }
                        return '参数异常，无法转换数据';
                    })[0],
                );
            },
        }),
    );

    // 更换日志系统
    app.useLogger(app.get(LoggerService));

    // 读取环境配置
    const envConfig = app.get(ConfigService);
    // 获取端口号
    const { host, port = 3000, globalApiPrefix } = envConfig.get('app');

    // 启用全局接口前缀
    app.setGlobalPrefix(globalApiPrefix);

    // 非开发模式启用关闭钩子
    if (!isDev) {
        app.enableShutdownHooks();
    }

    // 根据环境判断是否启用swagger文档
    setupSwagger(app, envConfig);

    await app.listen(port, host, (err, address) => {
        console.log(`服务启动成功，端口号：${isDev ? `http://localhost:${port}/api-doc` : address}`);
    });
}

bootstrap();
