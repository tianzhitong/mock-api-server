/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 00:45:10
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 00:47:28
 * @FilePath: /mock-api-serve/src/share/logger/logger.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
    static forRoot() {
        return {
            global: true,
            module: LoggerModule,
            providers: [LoggerService],
            exports: [LoggerService],
        };
    }
}
