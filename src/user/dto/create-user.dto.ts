/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 14:37:23
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 15:16:49
 * @FilePath: /mock-api-serve/src/user/dto/create-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty({ required: true, type: String, description: '账号', default: '账号' })
    account: string;

    @ApiProperty({ required: true, type: String, description: '密码', default: '密码' })
    password: string;

    @ApiProperty({
        nullable: true,
        description: '角色 USER ADMIN',
        default: $Enums.Role.USER,
    })
    role?: $Enums.Role;

    @ApiProperty({
        description: '昵称',
        default: '昵称',
    })
    nick_name?: string;

    @ApiProperty({
        default: '头像',
    })
    avator?: string;

    @ApiProperty({
        default: $Enums.Sex.UNKNOW,
    })
    sex?: $Enums.Sex;
}
