/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 00:46:06
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 02:02:47
 * @FilePath: /mock-api-serve/src/share/logger/logger.service.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoggerService],
        }).compile();

        service = module.get<LoggerService>(LoggerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
