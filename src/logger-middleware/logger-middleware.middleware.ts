/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 21:59:16
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 22:07:37
 * @FilePath: /mock-api-serve/src/logger-middleware/logger-middleware.middleware.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class LoggerMiddlewareMiddleware implements NestMiddleware {
    private logger = new Logger();
    use(req: any, res: any, next: () => void) {
        // 获取开始时间
        const start = Date.now();
        // 获取请求信息
        const { method, originalUrl, ip, httpVersion, headers } = req;
        // 获取响应信息
        const { statusCode } = res;

        res.on('finish', () => {
            // 记录结束时间
            const end = Date.now();
            // 计算时间差
            const duration = end - start;

            // 这里可以根据自己需要组装日志信息：[timestamp] [method] [url] HTTP/[httpVersion] [client IP] [status code] [response time]ms [user-agent]
            const logFormat = `${dayjs().valueOf()} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms ${headers['user-agent']}`;

            // 根据状态码，进行日志类型区分
            if (statusCode >= 500) {
                this.logger.error(logFormat, originalUrl);
            } else if (statusCode >= 400) {
                this.logger.warn(logFormat, originalUrl);
            } else {
                this.logger.log(logFormat, originalUrl);
            }
        });
        next();
    }
}
