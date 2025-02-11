/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-26 22:11:41
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-11 03:11:51
 * @FilePath: /mock-api-serve/src/app.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
    @Get('hello')
    checkNetwork() {
        return 'hello nestjs!';
    }
}
