/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 18:47:24
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 18:53:05
 * @FilePath: /mock-api-serve/src/helper/genRedisKey.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RedisKeysEnum } from 'src/constants/cache.constant';

/** 生成的验证码 存入到redis中 */
export const genCaptchaImgKey = (key: string | number) => {
    return `${RedisKeysEnum.CAPTCHA_IMG_PREFIX}${String(key)}`;
};

/** 生成的token 存入到redis中 key-用户id value-token */
export const genAuthTokenKey = (key: string | number) => {
    return `${RedisKeysEnum.AUTH_TOKEN_PREFIX}${String(key)}`;
};
