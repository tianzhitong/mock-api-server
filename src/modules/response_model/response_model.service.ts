/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-25 00:25:07
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-25 01:09:44
 * @FilePath: /mock-api-serve/src/modules/response_model/response_model.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseModelDto, UpdateResponseModelDto } from './dto/response-model.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Injectable()
export class ResponseModelService {
    constructor(private readonly prismaService: PrismaService) {}

    async addProjectModel(createData: ResponseModelDto) {
        const projectList = await this.prismaService.mock.groupBy({
            by: ['project_name'],
        });
        // 判断mock表是否存在
        const isExist = projectList.some((project) => project.project_name === createData.name.trim());
        if (!isExist) {
            throw new BusinessException('该项目不存在，请使用tianzhitong-cli创建一个项目');
        }

        const findExist = await this.findOneByName(createData.name);
        if (findExist) {
            throw new BusinessException('该项目已存在，请勿重复创建');
        }
        await this.prismaService.reponseModel.create({
            data: {
                name: createData.name,
                model_data: createData.modelData,
            },
        });
    }

    async findOneByName(name: string) {
        return await this.prismaService.reponseModel.findUnique({
            where: {
                name,
            },
        });
    }

    async updateResponseModelDto(updateResponseModelDto: UpdateResponseModelDto) {
        await this.prismaService.reponseModel.update({
            where: {
                id: updateResponseModelDto.id,
            },
            data: {
                model_data: updateResponseModelDto.modelData,
            },
        });
    }
}
