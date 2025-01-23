/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 02:12:42
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 02:34:20
 * @FilePath: /mock-api-serve/src/common/filters/all-exception.filter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { isDev } from 'src/config';
import { BusinessException } from '../exceptions/business.exception';
import { ApiErrorEnum } from 'src/constants/error-code.constant';

interface CustomError {
    readonly status: number;
    readonly statusCode?: number;
    readonly message?: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);
    constructor() {
        this.registerCatchAllExceptionsHook();
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<FastifyRequest>();
        const response = ctx.getResponse<FastifyReply>();

        const url = request.raw.url!;

        const status = this.getStatus(exception);
        let message = this.getErrorMessage(exception);

        // 系统内部错误时
        if (status === HttpStatus.INTERNAL_SERVER_ERROR && !(exception instanceof BusinessException)) {
            Logger.error(exception, undefined, 'Catch');

            // 生产环境下隐藏错误信息
            if (!isDev) message = ApiErrorEnum.SERVER_ERROR?.split(':')[1];
        } else {
            this.logger.warn(`错误信息：(${status}) ${message} Path: ${decodeURI(url)}`);
        }

        const apiErrorCode = exception instanceof BusinessException ? exception.getErrorCode() : status;

        // 返回基础响应结果
        const resBody: ApiBaseResponse = {
            code: apiErrorCode,
            message,
            data: null,
        };

        response.status(status).send(resBody);
    }

    getErrorMessage(exception: unknown): string {
        if (exception instanceof HttpException) {
            return exception.message;
        }
        // else if (exception instanceof QueryFailedError) {
        //     return exception.message;
        // }
        return (exception as any)?.response?.message ?? (exception as CustomError)?.message ?? `${exception}`;
    }

    registerCatchAllExceptionsHook() {
        process.on('unhandledRejection', (reason) => {
            console.error('unhandledRejection: ', reason);
        });

        process.on('uncaughtException', (err) => {
            console.error('uncaughtException: ', err);
        });
    }

    getStatus(exception: unknown): number {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        }
        // else if (exception instanceof QueryFailedError) {
        //     // console.log('driverError', exception.driverError.code)
        //     return HttpStatus.INTERNAL_SERVER_ERROR;
        // }
        return (
            (exception as CustomError)?.status ??
            (exception as CustomError)?.statusCode ??
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
