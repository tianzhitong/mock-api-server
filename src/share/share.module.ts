/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 00:57:36
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 02:32:52
 * @FilePath: /mock-api-serve/src/share/share.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
    imports: [
        HttpModule,
        LoggerModule.forRoot(),
        ThrottlerModule.forRoot([
            {
                limit: 20,
                ttl: 60000,
            },
        ]),
        RedisModule,
    ],
    exports: [HttpModule, RedisModule],
})
export class ShareModule {}
