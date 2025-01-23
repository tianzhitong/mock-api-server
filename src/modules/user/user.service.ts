/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 02:46:26
 * @FilePath: /mock-api-serve/src/user/user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { $Enums } from '@prisma/client';
import { GetUserListDto } from './dto/get-user-list.dto';
import { bcrypt } from 'src/utils/bcrypt.util';
import { UserQueryDto } from './dto/user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

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
}
