/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 22:09:12
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 22:48:11
 * @FilePath: /mock-api-serve/src/config/winston.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// 定义日志级别颜色
export const levelsColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    verbose: 'cyan',
};

const winstonLogger = createLogger({
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
    defaultMeta: { service: 'log-service' },
    transports: [
        new transports.DailyRotateFile({
            filename: 'logs/errors/error-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
            datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
            zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
            maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
            maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
            level: 'error', // 日志类型，此处表示只记录错误日志。
        }),
        new transports.DailyRotateFile({
            filename: 'logs/warnings/warning-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'warn',
        }),
        new transports.DailyRotateFile({
            filename: 'logs/app/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
        }),
    ],
});

if (process.env.APP_ENV === 'development') {
    winstonLogger.add(
        new transports.Console({
            format: format.combine(format.simple()),
            level: 'debug',
        }),
    );
}

export default winstonLogger;
