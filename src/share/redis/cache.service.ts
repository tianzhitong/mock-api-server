/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:06:38
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 12:53:43
 * @FilePath: /mock-api-serve/src/share/redis/cache.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Redis } from 'ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { API_CACHE_PREFIX } from 'src/constants/cache.constant';
import { getRedisKey } from 'src/utils/redis.util';

// 获取器
export type TCacheKey = string;
export type TCacheResult<T> = Promise<T | undefined>;

@Injectable()
export class CacheService {
    private cache!: Cache;

    private ioRedis!: Redis;
    constructor(@Inject(CACHE_MANAGER) cache: Cache) {
        this.cache = cache;
    }

    private get redisClient(): Redis {
        return (this.cache as any).store.client;
    }

    public get<T>(key: TCacheKey): TCacheResult<T> {
        return this.cache.get(key);
    }

    public set(key: TCacheKey, value: any, milliseconds: number) {
        return this.cache.set(key, value, milliseconds);
    }

    public getClient() {
        return this.redisClient;
    }

    public async cleanCatch() {
        const redis = this.getClient();
        const keys: string[] = await redis.keys(`${API_CACHE_PREFIX}*`);
        await Promise.all(keys.map((key) => redis.del(key)));
    }

    public async cleanAllRedisKey() {
        const redis = this.getClient();
        const keys: string[] = await redis.keys(getRedisKey('*'));

        await Promise.all(keys.map((key) => redis.del(key)));
    }
}
