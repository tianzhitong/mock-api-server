/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:00:30
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 21:05:08
 * @FilePath: /mock-api-serve/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptorInterceptor } from './api-interceptor/api-interceptor.interceptor';
import { ConfigModule } from '@nestjs/config';
import loadConfigFile from './config';

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
export class AppModule {}
