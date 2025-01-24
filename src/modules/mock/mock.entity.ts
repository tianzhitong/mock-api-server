/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 13:35:40
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 13:38:29
 * @FilePath: /mock-api-serve/src/modules/mock/mock.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';

export class MockEntity {
    @ApiProperty({ required: true, type: String, description: '主键' })
    id: number;

    @ApiProperty({ required: true, type: String, description: '项目名字' })
    project_name: string;

    @ApiProperty({ required: true, type: String, description: '接口url' })
    api_url: string;

    @ApiProperty({ required: true, type: String, description: '接口方法' })
    api_method: string;

    @ApiProperty({ required: true, type: String, description: '接口的查询参数' })
    query: string;

    @ApiProperty({ required: true, type: String, description: '根据swagger获取到的mock信息' })
    response_to_mock_struct_data: string;

    @ApiProperty({ required: true, type: String, description: '创建时间' })
    create_at: string;

    @ApiProperty({ required: true, type: String, description: '更新时间' })
    update_at: string;

    @ApiProperty({ required: true, type: String, description: '删除时间' })
    delete_at: string;
}
