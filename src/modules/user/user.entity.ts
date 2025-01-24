/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 00:50:06
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 12:47:19
 * @FilePath: /mock-api-serve/src/modules/user/user-entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
    id: number;
    @ApiProperty({ required: true, type: String, description: '账号' })
    username: string;

    @Exclude()
    @ApiProperty({ required: true, type: String, description: '密码' })
    password: string;

    @ApiProperty({ required: true, type: String, description: '角色权限' })
    role: $Enums.Role;

    @ApiProperty({ required: true, type: String, description: '昵称' })
    nick_name: string;

    @ApiProperty({ required: true, type: String, description: '头像' })
    avator: string;

    @ApiProperty({ required: true, type: String, description: '性别' })
    sex: $Enums.Sex;

    @ApiProperty({ required: true, type: String, description: '创建时间' })
    create_at: Date;

    @ApiProperty({ required: true, type: String, description: '更新时间' })
    update_at: Date;

    @Exclude()
    @ApiProperty({ required: true, type: String, description: '删除时间' })
    delete_at: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
