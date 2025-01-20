/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 19:53:54
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 20:04:25
 * @FilePath: /mock-api-serve/src/mock/dto/create-mock.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class ApiUrlListDto {
    @ApiProperty({ required: true, type: String, description: '接口列表', default: '密码' })
    apiUrl: string;

    @ApiProperty({ required: true, type: String, description: '接口方法', default: 'get' })
    apiMethod: string;

    @ApiProperty({ type: String, description: '请求参数', default: '?name=1' })
    query: string;

    @ApiProperty({ required: true, type: String, description: '对于mock的数据', default: '{}' })
    responseToMockStructData: string;
}

export class CreateMockDto {
    @ApiProperty({ type: String, description: '项目名字', default: '项目名字' })
    projectName?: string;

    @ApiProperty({ type: Array<ApiUrlListDto>, description: '接口列表', default: [] })
    apiList: ApiUrlListDto[];
}
