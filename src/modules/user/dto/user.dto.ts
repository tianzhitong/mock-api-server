/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 01:17:42
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 03:22:31
 * @FilePath: /mock-api-serve/src/modules/user/dto/user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty, IntersectionType, PartialType, OmitType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsIn, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { PageDto } from 'src/common/dto/page.dto';

export class UserDto {
    @ApiProperty({ example: '账号', required: true, type: String })
    @IsString()
    @Length(5, 20)
    username: string;

    @ApiProperty({ required: true, type: String, description: '密码' })
    @IsString()
    @MinLength(6, {
        message: '密码至少六位数',
    })
    password: string;

    @ApiProperty({ required: true, type: String, description: '角色权限', example: $Enums.Role.USER })
    @IsString()
    @IsOptional()
    role?: $Enums.Role;

    @ApiProperty({ required: true, type: String, description: '昵称', example: '' })
    @IsString()
    @IsOptional()
    nickName?: string;

    @ApiProperty({ required: true, type: String, description: '头像', example: '' })
    @IsString()
    @IsOptional()
    avator?: string;

    @ApiProperty({ required: true, type: String, description: '性别', example: $Enums.Sex.UNKNOW })
    @IsIn([$Enums.Sex.MAN, $Enums.Sex.WOMAN, $Enums.Sex.UNKNOW])
    @IsOptional()
    sex?: $Enums.Sex;
}

export class UserEntity extends OmitType(UserDto, ['password']) {
    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}

export class UserUpdateDto extends PartialType(UserDto) {}

export class UserQueryDto extends IntersectionType(PageDto, PartialType(UserDto)) {}
