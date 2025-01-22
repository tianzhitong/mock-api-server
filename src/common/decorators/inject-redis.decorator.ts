/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:32:08
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:32:12
 * @FilePath: /mock-api-serve/src/common/decorators/inject-redis.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Inject } from '@nestjs/common';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

// 自定义 InjectRedis 装饰器
export const InjectRedis = () => Inject(REDIS_CLIENT);
