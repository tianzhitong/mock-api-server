/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 00:59:26
 * @FilePath: /mock-api-serve/src/user/user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserInfoVO } from './vo/user-info.vo';
import { Response } from 'express';
import { GetUserListDto } from './dto/get-user-list.dto';
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { captcha } from 'src/utils/captcha.util';
import transReponseListData from 'src/utils/trans-reponse-list-data.util';
import { bcrypt } from 'src/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from 'src/common/decorators/inject-redis.decorator';
import Redis from 'ioredis';
import { genAuthTokenKey } from 'src/helper/genRedisKey';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { UserEntity } from './user-entity';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly userService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

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
    async createUserInfo(@Body() createUserDto: CreateUserDto) {
        await this.userService.createUserInfo(createUserDto);
    }

    @Post('login')
    @ApiResult({ model: String })
    async login(@Body() loginUserDTO: LoginUserDTO) {
        // 【1】查看账号是否存在
        const userExist = await this.userService.findUserInfoByAccount(loginUserDTO.username);
        if (!userExist) {
            throw new Error('暂未找到该用户');
        }

        // 【2】比对密码是否相同
        const passwordEq = await bcrypt.comparePassword(loginUserDTO.password, userExist.password);
        if (!passwordEq) {
            throw new Error('密码不正确');
        }

        // 【3】删除密码信息
        Reflect.deleteProperty(userExist, 'password');

        // 【4】生成token 存储在redis里。做持久化存储和踢人功能
        const token = await this.jwtService.signAsync(userExist);
        this.redis.set(
            genAuthTokenKey(userExist.id),
            JSON.stringify(userExist),
            'EX',
            this.configService.get('jwt.jwtExprire'),
        );
        return token;
    }

    @Get('findUserInfo')
    @Roles(Role.USER, Role.ADMIN)
    @ApiResult({ model: UserEntity })
    async findUserInfo(@Req() req: FastifyRequest) {
        const userInfo = await this.userService.findUserInfoById(+req.user.id);
        return new UserEntity(userInfo);
    }

    @Get('getCaptcha')
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
