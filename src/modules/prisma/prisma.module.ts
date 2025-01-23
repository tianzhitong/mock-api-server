/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 23:00:46
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 02:28:10
 * @FilePath: /mock-api-serve/src/prisma/prisma.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
