/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:01:40
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-19 23:56:22
 * @FilePath: /mock-api-serve/src/prisma/prisma.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
