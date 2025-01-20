/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-21 00:15:52
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 00:41:41
 * @FilePath: /mock-api-serve/src/utils/utils.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { SvgCaptchaService } from './services/svg-captcha/svg-captcha.service';

@Global()
@Module({
    providers: [BcryptService, SvgCaptchaService],
    exports: [BcryptService, SvgCaptchaService],
})
export class UtilsModule {}
