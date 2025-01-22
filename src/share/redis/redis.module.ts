/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:02:45
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:55:30
 * @FilePath: /mock-api-serve/src/share/redis/redis.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RedisModule as NestRedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { Global, Module, Provider } from '@nestjs/common';
import { CacheService } from './cache.service';
import { REDIS_PUBSUB } from './redis.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';
import { RedisSubPub } from './redis-subpub';
import { REDIS_CLIENT } from 'src/common/decorators/inject-redis.decorator';
import { RedisPubSubService } from './subpub.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

const providers: Provider[] = [
    CacheService,
    {
        provide: REDIS_PUBSUB,
        useFactory: (configService: ConfigService) => {
            const redisOptions: RedisOptions = configService.get('redis');
            return new RedisSubPub(redisOptions);
        },
        inject: [ConfigService],
    },
    RedisPubSubService,
    {
        provide: REDIS_CLIENT,
        useFactory: (redisService: RedisService) => {
            return redisService.getOrThrow();
        },
        inject: [RedisService], // 注入 RedisService
    },
];

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const redisOptions: RedisOptions = configService.get('redis');
                return {
                    isGlobal: true,
                    store: redisStore,
                    isCacheableValue: () => true,
                    ...redisOptions,
                };
            },
            inject: [ConfigService],
        }),
        // redis
        NestRedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                readyLog: true,
                config: configService.get('redis'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers,
    exports: [...providers, CacheModule],
})
export class RedisModule {}
