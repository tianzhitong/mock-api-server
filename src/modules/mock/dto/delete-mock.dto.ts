/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-02-19 19:17:27
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-19 19:24:39
 * @FilePath: /mock-api-serve/src/modules/mock/dto/delete-mock.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMockDto {
    @ApiProperty({ required: true, type: Number, description: '项目id' })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
