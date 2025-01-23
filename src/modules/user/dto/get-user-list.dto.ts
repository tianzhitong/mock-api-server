/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-21 01:42:29
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 01:57:21
 * @FilePath: /mock-api-serve/src/user/dto/get-user-list.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PageDto } from 'src/utils/dto/page.dto';

export class GetUserListDto extends PageDto {
    @IsOptional()
    @ApiProperty({ required: false, type: String, description: '昵称', example: '' })
    nickName?: string;

    @IsOptional()
    @ApiProperty({ required: false, type: String, description: '账号', example: '' })
    account?: string;
}
