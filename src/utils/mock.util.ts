/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-24 18:28:53
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-28 01:57:36
 * @FilePath: /mock-api-serve/src/utils/mock.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Random, mock } from 'mockjs';

Random.extend({
    phone: function (type) {
        const phones = [
            13333333333, 18758557977, 18080808080, 13498766666, 13584388888, 13609999999, 13788888888, 13869999999,
            13938888888, 14788888888, 15088888888, 18998998998, 17888888888,
        ];
        if (type === 'string') {
            return this.pick(phones).toString();
        }
        return this.pick(phones);
    },
    regexp: function (regexp: RegExp) {
        const res = mock({
            regexp,
        });
        return res.regexp;
    },
    timestamp: function () {
        const randomtime = Math.floor(Math.random() * Math.pow(10, Math.floor(Math.random() * 5)));
        if (randomtime % 2) {
            return new Date().getTime() + randomtime;
        }
        return new Date().getTime() - randomtime;
    },
    img: function () {
        return 'https://dummyimage.com/200/000000/fff.png&text=test';
    },
});

/** 是否基础类型 */
const baseTypeList = ['boolean', 'number', 'string', 'integer'];

const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

export const genMockApiData = (data: any, responseModel: object) => {
    let template = {};
    if (typeof data === 'object' && data !== null) {
        const keys = Reflect.ownKeys(data);
        keys.forEach((key) => {
            if(Array.isArray(data[key])) {
                const result = generateMockData(data, key);
                const newKey = Object.keys(result ?? {})[0];
                template = {...template, [newKey]: [result[newKey]]};
            }else {
                const result = generateMockData(data, key);
                template[key] = result;
            }

        });
    }
    // 使用 mock.mock 生成数据
    const mockData = mock({
        ...template,
        ...responseModel,
    });

    return mockData;
};

const generateMockData = (data: any, parentKey: string | symbol) => {
    if (baseTypeList.includes(data[parentKey])) {
        if (data[parentKey] === 'string') {
            let mockTpl = '@cword(3,30)';
            if (/phone/i.test(String(parentKey))) {
                return '@phone(string)';
            }
            if (/email/i.test(String(parentKey))) {
                return '@email';
            }
            if (/time/i.test(String(parentKey))) {
                mockTpl = '@now';
            }
            if (/head/i.test(String(parentKey)) || /img/i.test(String(parentKey)) || /image/i.test(String(parentKey))) {
                mockTpl = '@img(200X200)';
            }
            if (/link/i.test(String(parentKey))) {
                mockTpl = '@url("http")';
            }
            return mockTpl;
        }
        if (data[parentKey] === 'boolean') {
            return true;
        }
        if (data[parentKey] === 'number' || data[parentKey] === 'integer') {
            if (/price/i.test(String(parentKey))) {
                return '@float(60, 100, 3, 2)';
            }
            if (/total/i.test(String(parentKey))) {
                return '@integer(1000, 10000)';
            }
            return '@integer(10, 100)';
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
                result[`${key as any}|1-10`] = [value[`${key as any}|1-10`]];
            } else {
                result[key] = value;
            }
        });
    }
    return result;
};

