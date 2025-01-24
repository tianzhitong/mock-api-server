/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 19:53:54
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 17:55:45
 * @FilePath: /mock-api-serve/src/mock/dto/create-mock.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsArray, ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateMockDto {
    @ApiProperty({ required: true, type: String, description: '项目名字' })
    @IsString()
    @IsOptional()
    projectName: string;

    @ApiProperty({ required: true, type: String, description: '接口url' })
    @IsString()
    @IsNotEmpty({
        message: 'api_url不能为空',
    })
    apiUrl: string;

    @ApiProperty({ required: true, type: String, description: '接口方法' })
    @IsString()
    apiMethod: string;

    @ApiProperty({ required: true, type: String, description: '接口的查询参数' })
    @IsString()
    @IsOptional()
    query: string;

    @ApiProperty({ required: true, type: String, description: '根据swagger获取到的mock信息' })
    @IsString()
    @IsNotEmpty()
    responseToTockStructData: string;
}

export class CreateMockListDto {
    @ApiProperty({ required: true, type: [CreateMockDto], description: '列表数据' })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateMockDto)
    list: CreateMockDto[];
}

export class ClientGetMockDataDtO {
    @ApiProperty({ required: true, type: String, description: '项目名字' })
    @IsString()
    @IsOptional()
    projectName: string;

    @ApiProperty({ required: true, type: String, description: '接口url' })
    @IsString()
    @IsNotEmpty({
        message: 'apiUrl不能为空',
    })
    apiUrl: string;

    @ApiProperty({ required: true, type: String, description: '接口方法' })
    @IsString()
    apiMethod: string;
}
