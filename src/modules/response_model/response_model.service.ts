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

    async returnAllModel() {
        // 查询reponseModel的数组。并且查询mock表project_name有多少条数据
        const reponseModel = await this.prismaService.reponseModel.findMany();
        const mock = await this.prismaService.mock.findMany();
        const mockCount = mock.reduce((acc, item) => {
            acc[item.project_name] = (acc[item.project_name] || 0) + 1;
            return acc;
        }, {});
        return reponseModel.map((item) => {
            return {
                ...item,
                mockApiCount: mockCount[item.name] || 0,
            };
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
