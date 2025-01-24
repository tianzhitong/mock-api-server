/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:05:20
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:59:20
 * @FilePath: /mock-api-serve/src/mock/mock.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Body, Controller, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMockListDto } from './dto/create-mock.dto';

@ApiTags('Mock')
@Controller('mock')
export class MockController {
    constructor(private readonly mockService: MockService) {}

    @Post('createMockApi')
    createMockApi(@Body() createMockListDto: CreateMockListDto) {
        console.log('createMockListDto.list', createMockListDto.list);
    }
}
