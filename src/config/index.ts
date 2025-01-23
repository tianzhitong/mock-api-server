/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 20:59:05
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 19:13:00
 * @FilePath: /mock-api-serve/src/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configFileNameObj = {
    development: 'dev',
    test: 'test',
    production: 'prod',
};

const APP_ENV = process.env.APP_ENV;
const loadConfigFile = () => {
    const readBaseFile = readFileSync(join(__dirname, `./${configFileNameObj[APP_ENV]}.yml`), 'utf8');
    return yaml.load(readBaseFile) as Record<string, any>;
};

/** 是否开发环境 */
export const isDev = APP_ENV === 'development';

export default loadConfigFile;
