/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-21 01:43:05
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 01:41:19
 * @FilePath: /mock-api-serve/src/utils/dto/page.dto.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PageDto {
    @IsOptional()
    @ApiProperty({ required: true, type: Number, description: '一页多少条', example: 1 })
    pageSize: number;

    @IsOptional()
    @ApiProperty({ required: true, type: Number, description: '第几页', example: 20 })
    pageNum: number;
}
