/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:09:14
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:09:18
 * @FilePath: /mock-api-serve/src/constants/error-code.constant.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum ApiErrorEnum {
    DEFAULT = '0:未知错误',
    SERVER_ERROR = '500:服务繁忙，请稍后再试',

    SYSTEM_USER_EXISTS = '1001:系统用户已存在',
}
