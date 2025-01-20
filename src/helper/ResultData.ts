/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 18:28:33
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 19:08:41
 * @FilePath: /mock-api-serve/src/helper/ResultData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';

export class ResultData {
    constructor(code = 200, msg?: string, data?: any, success?: boolean) {
        this.code = code;
        this.msg = msg || 'ok';
        this.data = data || null;
        this.success = success || false;
    }

    @ApiProperty({ type: 'number', default: 200 })
    code?: number;

    @ApiProperty({ type: 'string', default: 'ok' })
    msg?: string;

    @ApiProperty({ type: 'boolean', default: true })
    success?: boolean;

    data?: any;

    static ok(data?: any, msg?: string): ResultData {
        return new ResultData(200, msg, data, true);
    }

    static fail(code: number, msg?: string, data?: any): ResultData {
        return new ResultData(code || 500, msg || 'fail', data, false);
    }
}
