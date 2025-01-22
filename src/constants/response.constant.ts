/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 01:11:10
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 01:11:15
 * @FilePath: /mock-api-serve/src/constants/response.constant.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const RESPONSE_SUCCESS_CODE = 200;

export const RESPONSE_SUCCESS_MSG = 'success';

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
