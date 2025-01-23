/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:00:30
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:26:17
 * @FilePath: /mock-api-serve/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MockModule } from './modules/mock/mock.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import loadConfigFile from './config';
import { LoggerMiddlewareMiddleware } from './logger-middleware/logger-middleware.middleware';
import { UtilsModule } from './utils/utils.module';
import { LoggerModule } from './share/logger/logger.module';
import { ShareModule } from './share/share.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiDataTransformInterceptor } from './common/interceptors/api-data-transform/api-data-transform.interceptor';

@Module({
    imports: [
        MockModule,
        UserModule,
        PrismaModule,
        UtilsModule,
        ConfigModule.forRoot({
            cache: true,
            load: [loadConfigFile],
            isGlobal: true,
        }),
        LoggerModule,
        ShareModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ApiDataTransformInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddlewareMiddleware).forRoutes('*');
    }
}
