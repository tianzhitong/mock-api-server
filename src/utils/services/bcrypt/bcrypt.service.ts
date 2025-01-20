/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-21 00:18:08
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-21 00:21:18
 * @FilePath: /mock-api-serve/src/utils/services/bcrypt/bcrypt.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    /** 将密码生成为加盐的密码 */
    async hashPassword(password: string): Promise<string> {
        // 生成一个盐值，用于增强哈希的安全性
        const salt = await bcrypt.genSalt();
        // 使用生成的盐值对密码进行哈希，并返回哈希结果
        return bcrypt.hash(password, salt);
    }

    /** 比较两个密码是否匹配 */
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // 使用bcrypt库的compare方法比较明文密码和哈希密码是否匹配
        return bcrypt.compare(password, hashedPassword);
    }
}
