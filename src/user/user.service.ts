/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 00:30:12
 * @FilePath: /mock-api-serve/src/user/user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from 'src/utils/services/bcrypt/bcrypt.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private bcrypt: BcryptService,
    ) {}

    async getUserList() {
        const res = await this.prisma.user.findMany();
        return res;
    }

    async findUserInfoByAccount(account: string) {
        return this.prisma.user.findFirst({
            where: {
                account: account,
            },
        });
    }

    async findUserInfoByAccountAndPassword(account: string, password: string) {
        return this.prisma.user.findFirst({
            where: {
                account: account,
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
        const exist = await this.findUserInfoByAccount(createUserInfo.account);
        if (exist.id > 0) {
            throw new Error('账号已存在');
            return;
        }
        const hashPassword = await this.bcrypt.hashPassword(createUserInfo.password);
        const { role = $Enums.Role.USER } = createUserInfo;
        return this.prisma.user.create({
            data: {
                account: createUserInfo.account,
                password: hashPassword,
                nick_name: createUserInfo.nick_name,
                avator: createUserInfo.avator,
                role: role,
            },
        });
    }
}
