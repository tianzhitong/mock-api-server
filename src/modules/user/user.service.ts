/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 12:53:06
 * @FilePath: /mock-api-serve/src/user/user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { $Enums } from '@prisma/client';
import { bcrypt } from 'src/utils/bcrypt.util';
import { UserQueryDto } from './dto/user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { InjectRedis } from 'src/common/decorators/inject-redis.decorator';
import { genAuthTokenKey } from 'src/helper/genRedisKey';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    @InjectRedis()
    private readonly redis: Redis;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    getUserList(query: UserQueryDto) {
        const skip = (Number(query.pageNum) - 1) * Number(query.pageSize);
        const take = Number(query.pageSize);

        const where = {};
        if (query.username) {
            where['username'] = query.username;
        }
        if (query.nickName) {
            where['nick_name'] = query.nickName;
        }
        if (query.sex) {
            where['sex'] = query.sex;
        }
        if (query.role) {
            where['role'] = query.role;
        }

        return this.prisma.$transaction(async (tx) => {
            const findManyUserList = await tx.user.findMany({
                where,
                skip,
                take,
                omit: {
                    password: true,
                },
                orderBy: {
                    create_at: 'desc',
                },
            });
            const total = await tx.user.count({ where });

            return {
                data: findManyUserList,
                total,
            };
        });
    }

    async findUserInfoByAccount(username: string) {
        return this.prisma.user.findFirst({
            where: {
                username: username,
            },
        });
    }

    async findUserInfoByAccountAndPassword(username: string, password: string) {
        return this.prisma.user.findFirst({
            where: {
                username: username,
                password: password,
            },
        });
    }

    async findUserInfoById(id: number) {
        return this.prisma.user.findFirst({
            where: {
                id: id,
            },
        });
    }

    async createUserInfo(createUserInfo: CreateUserDto) {
        const exist = await this.findUserInfoByAccount(createUserInfo.username);
        if (exist) {
            throw new BusinessException('账号已存在');
        }
        const hashPassword = await bcrypt.hashPassword(createUserInfo.password);
        const { role = $Enums.Role.USER } = createUserInfo;
        return this.prisma.user.create({
            data: {
                username: createUserInfo.username,
                password: hashPassword,
                nick_name: createUserInfo.nick_name,
                avator: createUserInfo.avator,
                role: role,
            },
        });
    }

    async login(loginUserDTO: LoginUserDTO) {
        // 【1】查看账号是否存在
        const userExist = await this.findUserInfoByAccount(loginUserDTO.username);
        if (!userExist) {
            throw new BusinessException('暂未找到该用户');
        }

        // 【2】比对密码是否相同
        const passwordEq = await bcrypt.comparePassword(loginUserDTO.password, userExist.password);
        if (!passwordEq) {
            throw new BusinessException('账号或者密码不正确');
        }

        // 【3】删除密码信息
        Reflect.deleteProperty(userExist, 'password');

        // 【4】生成token 存储在redis里。做持久化存储和踢人功能
        const token = await this.jwtService.signAsync(userExist);

        // 存储到redis里
        this.redis.set(
            genAuthTokenKey(userExist.id),
            JSON.stringify(userExist),
            'EX',
            this.configService.get('jwt.jwtExprire'),
        );
        return token;
    }
}
