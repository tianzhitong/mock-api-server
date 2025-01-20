/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 20:42:21
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 02:38:22
 * @FilePath: /mock-api-serve/src/app.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResult } from './api-result/api-result';

@ApiTags('Health')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    @ApiResult({model: String})
    getHello(): string {
        return this.appService.getHello();
    }
}
