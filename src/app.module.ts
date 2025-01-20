/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:00:30
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 22:12:22
 * @FilePath: /mock-api-serve/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptorInterceptor } from './api-interceptor/api-interceptor.interceptor';
import { ConfigModule } from '@nestjs/config';
import loadConfigFile from './config';
import { LoggerMiddlewareMiddleware } from './logger-middleware/logger-middleware.middleware';
import winstonLogger from './config/winston.config';

@Module({
    imports: [
        MockModule,
        UserModule,
        PrismaModule,
        ConfigModule.forRoot({
            cache: true,
            load: [loadConfigFile],
            isGlobal: true,
        }),
        WinstonModule.forRoot({
            transports: winstonLogger.transports,
            format: winstonLogger.format,
            defaultMeta: winstonLogger.defaultMeta,
            exitOnError: false, // 防止意外退出
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ApiInterceptorInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddlewareMiddleware).forRoutes('*');
    }
}
