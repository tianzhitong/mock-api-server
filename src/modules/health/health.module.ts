/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 21:02:22
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 21:06:04
 * @FilePath: /mock-api-serve/src/modules/health/health.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    imports: [TerminusModule],
    controllers: [HealthController],
    providers: [],
})
export class HealthModule {}
