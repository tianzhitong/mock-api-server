/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-25 00:29:14
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-25 00:30:21
 * @FilePath: /mock-api-serve/src/modules/response_model/response_model.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';

export class ResponseModelEntity {
    @ApiProperty({ required: true, type: String, description: '主键' })
    id: string;

    @ApiProperty({ required: true, type: String, description: '项目名称' })
    name: string;

    @ApiProperty({ required: true, type: String, description: '返回模型' })
    model_data: string;
}
