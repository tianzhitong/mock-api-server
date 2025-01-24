/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 18:28:53
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 22:23:13
 * @FilePath: /mock-api-serve/src/utils/mock.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { mock } from 'mockjs';

const baseTypeList = ['boolean', 'number', 'string', 'integer'];

const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

export const genMockApiData = (data: any) => {
    const template = {};
    if (typeof data === 'object' && data !== null) {
        const keys = Reflect.ownKeys(data);
        keys.forEach((key) => {
            const result = generateMockData(data, key);
            template[key] = result;
        });
    }

    // 使用 mock.mock 生成数据
    const mockData = mock(template);
    return mockData;
};

const generateMockData = (data: any, parentKey: string | symbol) => {
    if (baseTypeList.includes(data[parentKey])) {
        if (data[parentKey] === 'string') {
            return '@ctitle(10,30)'; // 默认字符串模板
        }
        if (data[parentKey] === 'integer') {
            return '@integer(1, 100)';
        }
        if (data[parentKey] === 'number') {
            return '@integer(1, 100)'; // 默认数字模板
        }
        if (data[parentKey] === 'boolean') {
            return true;
        }
        return;
    }
    const result = {};
    if (Array.isArray(data[parentKey])) {
        const genArrayKey = `${String(parentKey)}|1-10`;
        Object.keys(data[parentKey]).forEach((key) => {
            const value = generateMockData(data[parentKey], key);
            result[genArrayKey] = value;
        });
    }
    if (isObject(data[parentKey])) {
        Object.keys(data[parentKey]).forEach((key) => {
            const value = generateMockData(data[parentKey], key);
            if (Array.isArray(data[parentKey][key])) {
                // result[key] = {};
                result[`${key as any}|1-10`] = [value[`${key as any}|1-10`]];
            } else {
                result[key] = value;
            }
        });
    }
    return result;
};
