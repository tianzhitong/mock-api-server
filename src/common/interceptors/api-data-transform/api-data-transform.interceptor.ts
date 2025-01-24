/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 19:20:33
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-24 12:41:57
 * @FilePath: /mock-api-serve/src/common/interceptors/api-data-transform/api-data-transform.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseModel } from 'src/common/model/response.model';

/** 统一处理接口请求与响应结果 */
@Injectable()
export class ApiDataTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return ResponseModel.success(data);
            }),
        );
    }
}
