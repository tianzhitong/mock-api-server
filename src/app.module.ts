/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:00:30
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:14:11
 * @FilePath: /mock-api-serve/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MockModule } from './modules/mock/mock.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfigFile from './config';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { LoggerModule } from './share/logger/logger.module';
import { ShareModule } from './share/share.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiDataTransformInterceptor } from './common/interceptors/api-data-transform/api-data-transform.interceptor';
import { HealthModule } from './modules/health/health.module';
import { JWTGuard } from './common/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [loadConfigFile],
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config) => {
                return {
                    secret: config.get('jwt.secret'),
                };
            },
        }),
        MockModule,
        UserModule,
        PrismaModule,
        LoggerModule,
        ShareModule,
        HealthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ApiDataTransformInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JWTGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
