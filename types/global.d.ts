/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 19:41:00
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 02:33:42
 * @FilePath: /mock-api-serve/types/global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare global {
    interface IAuthUser {
        id: number;
        username: string;
        nick_name?: string;
        avator?: string;
        role?: string;
    }

    export interface ApiBaseResponse<T = any> {
        message: string;
        code: number;
        data?: T;
    }
}

export {};
