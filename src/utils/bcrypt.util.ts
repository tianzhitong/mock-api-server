/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 20:47:42
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 20:53:23
 * @FilePath: /mock-api-serve/src/utils/bcrypt.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as bcryptThirdTool from 'bcrypt';

/** 将密码生成为加盐的密码 */
export const hashPassword = async (password: string): Promise<string> => {
    // 生成一个盐值，用于增强哈希的安全性
    const salt = await bcryptThirdTool.genSalt();
    // 使用生成的盐值对密码进行哈希，并返回哈希结果
    return bcryptThirdTool.hash(password, salt);
};

/** 比较两个密码是否匹配 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    // 使用bcryptThirdTool库的compare方法比较明文密码和哈希密码是否匹配
    return bcryptThirdTool.compare(password, hashedPassword);
};

export const bcrypt = {
    hashPassword,
    comparePassword,
};
