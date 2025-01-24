/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 22:20:51
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:11:42
 * @FilePath: /mock-api-serve/src/common/guards/token.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { InjectRedis } from '../decorators/inject-redis.decorator';
import Redis from 'ioredis';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { genAuthTokenKey } from 'src/helper/genRedisKey';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JWTGuard implements CanActivate {
    // TODO：后续需要再次改。和角色鉴权放在一块
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const token = this.extractTokenFromHeader(request);
        const roles = this.reflector.get(ROLES_KEY, context.getHandler());

        // 如果该接口不设置权限直接进入下一个guard或者拦截器
        if ((roles ?? []).length === 0) {
            return true;
        }

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 根据jwt token解析为用户id
            const jwtSecret = this.configService.get('jwt.secret');
            const payload = this.jwtService.verify(token, {
                secret: jwtSecret,
            });
            const userId = payload.id;
            const getRedisTokenByUserId = await this.redis.get(genAuthTokenKey(userId));
            // 如果redis里的token和请求头里的token不一致，则抛出异常
            if (getRedisTokenByUserId !== token) {
                throw new UnauthorizedException();
            }

            const userInfo = await this.userService.findUserInfoById(userId);
            // 查询用户信息.将信息放入context中
            request.user = userInfo;
            request.accessToken = token;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
