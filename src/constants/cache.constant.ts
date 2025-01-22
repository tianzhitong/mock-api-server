/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:12:29
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:13:42
 * @FilePath: /mock-api-serve/src/constants/cache.constant.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum RedisKeysEnum {
    /** 访问ip */
    AccessIp = 'access_ip',
    /** 验证码 */
    CAPTCHA_IMG_PREFIX = 'captcha:img:',
    /** token */
    AUTH_TOKEN_PREFIX = 'auth:token:',
    /** 权限 */
    AUTH_PERM_PREFIX = 'auth:permission:',
    /** 权限密码版本 */
    AUTH_PASSWORD_V_PREFIX = 'auth:passwordVersion:',
    /** 在线用户 */
    ONLINE_USER_PREFIX = 'online:user:',
    /** token黑名单 */
    TOKEN_BLACKLIST_PREFIX = 'token:blacklist:',
}

/** api缓存前缀 */
export const API_CACHE_PREFIX = 'api-cache:';
