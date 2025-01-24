/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 18:59:05
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 18:59:12
 * @FilePath: /mock-api-serve/src/common/decorators/bypass.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SetMetadata } from '@nestjs/common';

export const BYPASS_KEY = Symbol('__bypass_key__');

/** 当不需要转换成基础返回格式时添加该装饰器 */
export const Bypass = () => SetMetadata(BYPASS_KEY, true);
