/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-21 00:39:47
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 00:40:31
 * @FilePath: /mock-api-serve/src/utils/services/svg-captcha/svg-captcha.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class SvgCaptchaService {
    async generateCaptcha(options: svgCaptcha.ConfigObject) {
        return svgCaptcha.create(options);
    }
}
