/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 21:56:32
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 00:47:20
 * @FilePath: /mock-api-serve/src/common/guards/roles.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // 如果该接口没有访问控制，那么直接走下一步
        if ((requiredRoles ?? []).length === 0) {
            return true;
        }
        // 获取用户信息token是否存在
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        return requiredRoles.some((role) => (request?.user?.role ?? '').includes(role));
    }
}
