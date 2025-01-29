/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-25 00:25:07
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-29 18:37:46
 * @FilePath: /mock-api-serve/src/modules/response_model/response_model.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseModelDto } from './dto/response-model.dto';

@Injectable()
export class ResponseModelService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOneByName(name: string) {
        return await this.prismaService.reponseModel.findUnique({
            where: {
                name,
            },
        });
    }

    async updateResponseModelDto(updateResponseModelDto: ResponseModelDto) {
        await this.prismaService.reponseModel.update({
            where: {
                name: updateResponseModelDto.name,
            },
            data: {
                model_data: updateResponseModelDto.modelData,
            },
        });
    }
}
