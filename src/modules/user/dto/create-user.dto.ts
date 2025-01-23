/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 14:37:23
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 01:09:04
 * @FilePath: /mock-api-serve/src/user/dto/create-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional, Length, MinLength } from 'class-validator';

export class CreateUserDto {
    @Length(5, 50, {
        message: '账号至少5位数',
    })
    @ApiProperty({ required: true, type: String, description: '账号', default: '账号' })
    username: string;

    @MinLength(6, {
        message: '密码至少六位数',
    })
    @ApiProperty({ required: true, type: String, description: '密码', default: '密码' })
    password: string;

    @ApiProperty({
        nullable: true,
        example: '角色 USER|ADMIN',
        default: $Enums.Role.USER,
    })
    @IsOptional()
    @IsEnum($Enums.Role)
    role?: $Enums.Role;

    @ApiProperty({
        example: '昵称',
    })
    @IsOptional()
    nick_name?: string;

    @ApiProperty({
        example: '头像',
    })
    @IsOptional()
    avator?: string;

    @ApiProperty({
        example: $Enums.Sex.UNKNOW,
    })
    @IsOptional()
    @IsEnum($Enums.Sex)
    sex?: $Enums.Sex;
}
