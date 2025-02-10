/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:01:40
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-11 01:18:51
 * @FilePath: /mock-api-serve/src/prisma/prisma.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(config: ConfigService) {
        const DATABASE_URL = config.get<string>('db.mysql.DATABASE_URL');
        super({
            log: ['query', 'info', 'warn', 'error'],
            datasources: {
                db: {
                    url: DATABASE_URL,
                },
            },
        });
    }

    async onModuleInit() {
        let retries = 5;
        while (retries > 0) {
            try {
                await this.$connect();
                break;
            } catch (err) {
                console.log('err', err);
                retries--;
                await new Promise((res) => setTimeout(res, 5000)); // 等待 5 秒后重试
            }
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
