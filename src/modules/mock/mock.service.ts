/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 20:15:15
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-19 19:50:55
 * @FilePath: /mock-api-serve/src/modules/mock/mock.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientGetMockDataDtO, CreateMockDto } from './dto/create-mock.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { genMockApiData } from 'src/utils/mock.util';
import { ResponseModelService } from '../response_model/response_model.service';

@Injectable()
export class MockService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly responseModelService: ResponseModelService,
    ) {}

    async delelteMockByProjectName(id: number) {
        return this.prisma.$transaction(async (tx) => {
            // 根据id查询项目
            const findProject = await tx.reponseModel.findFirst({
                where: {
                    id,
                },
            });
            if (!findProject) {
                throw new BusinessException('该项目不存在');
            }
            const projectName = findProject.name;
            await tx.reponseModel.delete({
                where: {
                    name: projectName,
                },
            });
            await tx.mock.deleteMany({
                where: {
                    project_name: projectName,
                },
            });
        });
    }

    async createMockApi(list: CreateMockDto[]) {
        const insertProjectName = (list[0]?.projectName ?? '').trim();
        const newInsertData = list.map((item) => {
            return {
                project_name: insertProjectName,
                api_url: item.apiUrl,
                api_method: item.apiMethod,
                query: item.query,
                response_to_mock_struct_data: item.responseToTockStructData,
            };
        });
        return this.prisma.$transaction(async (tx) => {
            await tx.reponseModel.upsert({
                where: {
                    name: insertProjectName,
                },
                update: {
                    name: insertProjectName,
                },
                create: {
                    name: insertProjectName,
                },
            });
            const findExist = await tx.mock.findMany({
                where: {
                    project_name: {
                        in: list.map(() => insertProjectName),
                    },
                    api_url: {
                        in: list.map((item) => item.apiUrl),
                    },
                    api_method: {
                        in: list.map((item) => item.apiMethod),
                    },
                },
            });
            if (findExist.length === 0) {
                return await this.prisma.mock.createMany({
                    data: newInsertData,
                });
            }

            const filterYetExistData = newInsertData.filter((item) => {
                return !findExist.some((existItem) => {
                    return (
                        existItem.project_name === item.project_name &&
                        existItem.api_url === item.api_url &&
                        existItem.api_method === item.api_method
                    );
                });
            });

            return await this.prisma.mock.createMany({
                data: filterYetExistData,
            });
        });
    }

    async clientGetMockData(clientGetMockDataDtO: ClientGetMockDataDtO) {
        const findResponseModel = await this.responseModelService.findOneByName(clientGetMockDataDtO.projectName);
        const responseModel = JSON.parse(findResponseModel?.model_data ?? '{}');
        const findMockApi = await this.prisma.mock.findFirst({
            where: {
                project_name: clientGetMockDataDtO.projectName,
                api_url: clientGetMockDataDtO.apiUrl,
                api_method: clientGetMockDataDtO.apiMethod,
            },
        });

        if (!findMockApi) {
            throw new BusinessException('该mock接口不存在');
        }
        return genMockApiData(JSON.parse(findMockApi.response_to_mock_struct_data), responseModel);
    }
}
