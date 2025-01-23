/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 21:40:14
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 21:42:05
 * @FilePath: /mock-api-serve/src/common/decorators/http.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { getIp } from 'src/utils/ip.util';

/** ip装饰器。获取IP地址 */
export const Ip = createParamDecorator((_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    return getIp(request);
});
