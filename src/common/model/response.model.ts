/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 19:11:25
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:16:44
 * @FilePath: /mock-api-serve/src/common/model/response.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MSG } from 'src/constants/response.constant';

export class ResponseModel<T = any> {
    @ApiProperty({})
    data?: T;

    @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
    code: number;

    @ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MSG })
    message: string;

    constructor(code: number, data: T, message = RESPONSE_SUCCESS_MSG) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    static success<T = any>(data?: T, message?: string): ResponseModel<T> {
        return new ResponseModel(RESPONSE_SUCCESS_CODE, data, message);
    }

    static error(code: number, message: string) {
        return new ResponseModel(code, {}, message);
    }
}
