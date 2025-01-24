/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-25 00:31:21
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-25 01:07:46
 * @FilePath: /mock-api-serve/src/modules/response_model/dto/response-model.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseModelDto {
    @ApiProperty({ example: '项目名称', required: true, type: String })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '模型数据', required: true, type: String })
    @IsString()
    @IsNotEmpty()
    modelData: string;
}

export class UpdateResponseModelDto extends OmitType(ResponseModelDto, ['name']) {
    @ApiProperty({ example: '主键', required: true, type: Number })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
