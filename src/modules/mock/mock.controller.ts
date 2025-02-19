/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:05:20
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-19 19:56:45
 * @FilePath: /mock-api-serve/src/mock/mock.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Body, Controller, Post, All, Query } from '@nestjs/common';
import { MockService } from './mock.service';
import { ApiTags } from '@nestjs/swagger';
import { ClientGetMockDataDtO, CreateMockListDto } from './dto/create-mock.dto';
import { Bypass } from 'src/common/decorators/bypass.decorator';
import { DeleteMockDto } from './dto/delete-mock.dto';
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Mock')
@Controller('mock')
export class MockController {
    constructor(private readonly mockService: MockService) {}

    @Post('delelteMockByProjectId')
    @Roles(Role.ADMIN)
    @ApiResult({
        model: Boolean,
    })
    async delelteMockByProjectId(@Body() deleteMockDto: DeleteMockDto) {
        await this.mockService.delelteMockByProjectId(deleteMockDto.id);
        return true;
    }

    @Post('createMockApi')
    async createMockApi(@Body() createMockListDto: CreateMockListDto) {
        await this.mockService.createMockApi(createMockListDto.list);
    }

    @Bypass()
    @All('clientGetMockData')
    async clientGetMockData(@Query() clientGetMockDataDtO: ClientGetMockDataDtO) {
        return await this.mockService.clientGetMockData(clientGetMockDataDtO);
    }
}
