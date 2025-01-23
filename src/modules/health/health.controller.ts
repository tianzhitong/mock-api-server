/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 21:02:22
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 21:17:04
 * @FilePath: /mock-api-serve/src/modules/health/health.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    DiskHealthIndicator,
    HealthCheck,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health - 健康检查')
@Controller('health')
export class HealthController {
    constructor(
        private readonly http: HttpHealthIndicator,
        private memory: MemoryHealthIndicator,
        private db: PrismaHealthIndicator,
        private disk: DiskHealthIndicator,
        private prismaclient: PrismaService,
    ) {}

    @Get('network')
    checkNetwork() {
        return this.http.pingCheck('baidu', 'https://www.baidu.com');
    }

    @Get('memory')
    checkMemory() {
        return this.memory.checkHeap('memory-heap', 200 * 1024 * 1024);
    }

    @Get('db')
    checkDB() {
        return this.db.pingCheck('prisma-heap', this.prismaclient);
    }

    @Get('disk')
    @HealthCheck()
    async checkDisk() {
        return this.disk.checkStorage('disk', {
            // The used disk storage should not exceed 75% of the full disk size
            thresholdPercent: 0.75,
            path: '/',
        });
    }
}
