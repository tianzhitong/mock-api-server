/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:20:56
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:23:31
 * @FilePath: /mock-api-serve/src/utils/redis.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RedisKeysEnum } from 'src/constants/cache.constant';

type Prefix = 'mock-system';
const prefix = 'mock-system';
export const getRedisKey = <T extends string = RedisKeysEnum | '*'>(
    key: T,
    ...concatKeys: string[]
): `${Prefix}:${T}${string | ''}` => {
    return `${prefix}:${key}${concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''}`;
};
