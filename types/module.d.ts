/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 19:39:38
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:42:56
 * @FilePath: /mock-api-serve/types/module.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: IAuthUser;
        accessToken?: string;
    }
}
