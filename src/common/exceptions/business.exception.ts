/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 02:25:54
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 02:40:30
 * @FilePath: /mock-api-serve/src/common/exceptions/biz.exception.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorEnum } from 'src/constants/error-code.constant';
import { RESPONSE_ERROR_CODE } from 'src/constants/response.constant';

export class BusinessException extends HttpException {
    private errorCode: number;
    constructor(error: ApiErrorEnum | string) {
        // 如果是非 ErrorEnum
        if (!error.includes(':')) {
            super(
                HttpException.createBody({
                    code: RESPONSE_ERROR_CODE,
                    message: error,
                }),
                HttpStatus.OK,
            );
            this.errorCode = RESPONSE_ERROR_CODE;
            return;
        }

        const [code, message] = error.split(':');
        super(
            HttpException.createBody({
                code,
                message,
            }),
            HttpStatus.OK,
        );

        this.errorCode = Number(code);
    }

    getErrorCode(): number {
        return this.errorCode;
    }
}
