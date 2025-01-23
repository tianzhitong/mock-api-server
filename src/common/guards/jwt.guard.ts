/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 22:20:51
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 01:05:36
 * @FilePath: /mock-api-serve/src/common/guards/token.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { InjectRedis } from '../decorators/inject-redis.decorator';
import Redis from 'ioredis';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { genAuthTokenKey } from 'src/helper/genRedisKey';

@Injectable()
export class JWTGuard implements CanActivate {
    // TODO：后续需要再次改。和角色鉴权放在一块
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const token = this.extractTokenFromHeader(request);

        if (token) {
            try {
                // 根据jwt token解析为用户id
                const jwtSecret = this.configService.get('jwt.secret');
                const payload = this.jwtService.verify(token, {
                    secret: jwtSecret,
                });
                if (payload?.id) {
                    // 根据用户id，查询redis用户中的id和信息。如果redis过期，那么登陆过期
                    const getRedisUserInfo = await this.redis.get(genAuthTokenKey(payload.id));
                    if (!getRedisUserInfo) {
                        // redis token已过期
                        throw new UnauthorizedException();
                    }
                    const parseRedisUserInfo = JSON.parse(getRedisUserInfo);
                    request['user'] = parseRedisUserInfo;
                    request['accessToken'] = token;
                }
            } catch {
                throw new UnauthorizedException();
            }
        }

        return true;
    }
}
