/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 19:43:09
 * @FilePath: /mock-api-serve/src/user/user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/api-result/api-result';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getUserList')
    @ApiResult({
        model: CreateUserDto,
        isArray: true,
        isPager: true,
    })
    getUserList() {
        return this.userService.getUserList();
    }

    @Post('createUserInfo')
    @ApiResult({ model: Boolean })
    createUserInfo(@Body('createUserDto') createUserDto: CreateUserDto) {
        console.log('createUserDto.account', createUserDto.account);
    }

    @Post('login')
    @ApiResult({ model: Boolean })
    async login(@Body('loginUserDTO') loginUserDTO: LoginUserDTO) {
        // 【1】查看账号是否存在
        const userExist = await this.userService.findUserInfoByAccount(loginUserDTO.account);
        if (!userExist.id) {
            throw new Error('暂未找到该用户');
        }
        // 【2】密码进行转换。对比是否存在该用户
        const findTrueUser = await this.userService.findUserInfoByAccountAndPassword(
            loginUserDTO.account,
            loginUserDTO.password,
        );
        if (!findTrueUser.id) {
            throw new Error('密码不正确');
        }
        // 生成token 存储在redis里。做持久化存储和踢人功能
    }
}
