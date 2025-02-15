/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-19 21:06:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-15 17:10:15
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
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { captcha } from 'src/utils/captcha.util';
import transReponseListData from 'src/utils/trans-reponse-list-data.util';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserQueryDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { BusinessException } from 'src/common/exceptions/business.exception';
import * as sharp from 'sharp';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getUserList')
    @Roles(Role.ADMIN, Role.USER)
    @ApiResult({
        model: UserEntity,
        isArray: true,
        isPager: true,
    })
    async getUserList(@Query() query: UserQueryDto) {
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
    async login(@Body() loginUserDTO: LoginUserDTO, @Req() req: FastifyRequest) {
        if ((req.cookies?.captcha ?? '').toLowerCase() !== loginUserDTO.captcha.toLowerCase()) {
            throw new BusinessException('验证码不正确或已过期');
        }
        return this.userService.login(loginUserDTO);
    }

    @Get('findUserInfo')
    @Roles(Role.USER, Role.ADMIN)
    @ApiResult({ model: UserEntity })
    async findCurrentUserInfo(@Req() req: FastifyRequest) {
        const userInfo = await this.userService.findUserInfoById(req.user.id);
        return new UserEntity(userInfo);
    }

    @Get('getCaptcha')
    @ApiResponse({
        status: 200,
        description: '获取验证码',
        content: {
            'image/png': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async getCaptcha(@Res() res: FastifyReply) {
        // 生成验证码svg数据,然后发送到客户端
        const genSvgData = captcha();
        // 将 SVG 转换为 PNG
        const pngBuffer = await sharp(Buffer.from(genSvgData.data)).png().toBuffer();
        res.cookie('captcha', genSvgData.text, {
            path: '/',
            httpOnly: true,
            sameSite: true,
            maxAge: 60 * 1000,
        });
        res.type('image/png');
        res.send(pngBuffer);
    }
}
