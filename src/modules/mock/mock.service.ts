/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 20:15:15
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:44:02
 * @FilePath: /mock-api-serve/src/modules/mock/mock.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MockService {
    constructor(private readonly prisma: PrismaService) {
        console.log('MockService init');
    }
}
