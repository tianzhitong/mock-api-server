/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 19:34:08
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 19:36:25
 * @FilePath: /mock-api-serve/src/api-interceptor/api-interceptor.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResultData } from 'src/helper/ResultData';

@Injectable()
export class ApiInterceptorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return ResultData.ok(data);
            }),
        );
    }
}
