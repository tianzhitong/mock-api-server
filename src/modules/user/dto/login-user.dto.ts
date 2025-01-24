/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 14:37:23
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:33:09
 * @FilePath: /mock-api-serve/src/user/dto/login-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginUserDTO {
    @Length(5, 50)
    @ApiProperty({ required: true, type: String, description: '账号', default: '账号' })
    username: string;

    @ApiProperty({ required: true, type: String, description: '密码', default: '密码' })
    @IsString()
    password: string;

    @ApiProperty({ required: true, type: String, description: '验证码', default: '验证码' })
    @IsString()
    @Length(4, 4, {
        message: '请输入正确的验证码',
    })
    captcha: string;
}
