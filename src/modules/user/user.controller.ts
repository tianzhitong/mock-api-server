/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 20:54:46
 * @FilePath: /mock-api-serve/src/user/user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserInfoVO } from './vo/user-info.vo';
import { Response } from 'express';
import { GetUserListDto } from './dto/get-user-list.dto';
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { captcha } from 'src/utils/captcha.util';
import transReponseListData from 'src/utils/transReponseListData.util';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getUserList')
    @ApiResult({
        model: UserInfoVO,
        isArray: true,
        isPager: true,
    })
    async getUserList(@Query() query: GetUserListDto) {
        const res = await this.userService.getUserList(query);

        return transReponseListData({
            data: res.data,
            total: res.total,
            query: query,
        });
    }

    @Post('createUserInfo')
    @ApiResult({ model: Boolean })
    async createUserInfo(@Body('createUserDto') createUserDto: CreateUserDto) {
        const res = await this.userService.createUserInfo(createUserDto);
        return res.id > 0;
    }

    @Post('login')
    @ApiResult({ model: Boolean })
    async login(@Body('loginUserDTO') loginUserDTO: LoginUserDTO) {
        // 【1】查看账号是否存在
        const userExist = await this.userService.findUserInfoByAccount(loginUserDTO.username);
        if (!userExist.id) {
            throw new Error('暂未找到该用户');
        }

        // 【2】密码进行转换。对比是否存在该用户
        const findTrueUser = await this.userService.findUserInfoByAccountAndPassword(
            loginUserDTO.username,
            loginUserDTO.password,
        );
        if (!findTrueUser.id) {
            throw new Error('密码不正确');
        }
        // 生成token 存储在redis里。做持久化存储和踢人功能
    }

    @Get('findUserInfo')
    @ApiResult({ model: UserInfoVO })
    async findUserInfo() {
        // TODO
        // 获取请求头的token信息，进行查询数据库数据
        return this.userService.findUserInfoById(0);
    }

    @Get('getCaptcha')
    // @ApiResult({ model: String })
    @ApiResponse({
        status: 200,
        description: '获取验证码',
        content: {
            'image/svg+xml': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async getCaptcha(@Res() res: Response) {
        // 生成验证码svg数据
        const genSvgData = captcha();
        res.type('image/svg+xml');
        res.send(genSvgData.data);
    }
}
