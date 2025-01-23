/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:05:20
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 00:01:55
 * @FilePath: /mock-api-serve/src/mock/mock.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';

@Module({
    controllers: [MockController],
    providers: [MockService],
})
export class MockModule {}
