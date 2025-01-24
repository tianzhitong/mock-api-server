/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-25 00:25:07
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-25 00:36:28
 * @FilePath: /mock-api-serve/src/modules/response_model/project_response_model.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { ResponseModelController } from './response_model.controller';
import { ResponseModelService } from './response_model.service';

@Module({
    controllers: [ResponseModelController],
    providers: [ResponseModelService],
    exports: [ResponseModelService],
})
export class ResponseModelModule {}
