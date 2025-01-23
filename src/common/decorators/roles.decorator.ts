/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 21:49:43
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 21:54:01
 * @FilePath: /mock-api-serve/src/common/decorators/roles.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'mock-roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
