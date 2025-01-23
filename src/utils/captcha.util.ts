/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 20:44:35
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 20:54:29
 * @FilePath: /mock-api-serve/src/utils/captcha.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as svgCaptcha from 'svg-captcha';

/** 构建svg验证码图片 */
export const captcha = () => {
    return svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1il',
    });
};
