/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 14:37:23
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:43:52
 * @FilePath: /mock-api-serve/src/user/dto/login-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
    @ApiProperty({ required: true, type: String, description: '账号', default: '账号' })
    username: string;

    @ApiProperty({ required: true, type: String, description: '密码', default: '密码' })
    password: string;
}
