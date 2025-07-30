/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 20:15:15
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-02-19 19:54:33
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

    async delelteMockByProjectId(id: number) {
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


    async deleteMockByProjectName(projectName: string) {
        return this.prisma.$transaction(async (tx) => {
            // 根据id查询项目
            const findProject = await tx.reponseModel.findFirst({
                where: {
                    name: projectName
                },
            });
            if (!findProject) {
                throw new BusinessException('该项目不存在');
            }
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
            // 更新或创建项目
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

            // 遍历每条数据进行更新或创建
            for (const item of newInsertData) {
                await tx.mock.upsert({
                    where: {
                        project_name_api_url_api_method: {
                            project_name: item.project_name,
                            api_url: item.api_url,
                            api_method: item.api_method,
                        },
                    },
                    update: {
                        query: item.query,
                        response_to_mock_struct_data: item.response_to_mock_struct_data
                    },
                    create: item
                });
            }
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
