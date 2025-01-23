/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 18:56:52
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:01:14
 * @FilePath: /mock-api-serve/src/common/adapters/fastify.adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FastifyCookie from '@fastify/cookie';
import FastifyMultipart from '@fastify/multipart';
import { FastifyAdapter } from '@nestjs/platform-fastify';

const fastifyApp: FastifyAdapter = new FastifyAdapter({
    trustProxy: true,
    logger: false,
});

fastifyApp.register(FastifyMultipart, {
    limits: {
        fields: 10, // Max number of non-file fields
        fileSize: 1024 * 1024 * 6, // limit size 6M
        files: 5, // Max number of file fields
    },
});

fastifyApp.register(FastifyCookie, {
    secret: 'cookie-secret', // 这个 secret 不太重要，不存鉴权相关，无关紧要
});

export default fastifyApp;
