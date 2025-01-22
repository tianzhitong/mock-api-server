/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:07:01
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:33:38
 * @FilePath: /mock-api-serve/src/share/redis/subpub.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Inject, Injectable } from '@nestjs/common';

import { REDIS_PUBSUB } from './redis.constant';
import { RedisSubPub } from './redis-subpub';

@Injectable()
export class RedisPubSubService {
    constructor(@Inject(REDIS_PUBSUB) private readonly redisSubPub: RedisSubPub) {}

    public async publish(event: string, data: any) {
        return this.redisSubPub.publish(event, data);
    }

    public async subscribe(event: string, callback: (data: any) => void) {
        return this.redisSubPub.subscribe(event, callback);
    }

    public async unsubscribe(event: string, callback: (data: any) => void) {
        return this.redisSubPub.unsubscribe(event, callback);
    }
}
