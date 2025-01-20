/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-20 18:31:48
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-20 19:10:16
 * @FilePath: /mock-api-serve/src/api-result/api-result.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResultData } from 'src/helper/ResultData';

const baseTypeNames = ['String', 'Number', 'Boolean'];

interface ApiResultProps<T> {
    /** 返回的 data 的数据类型 */
    model?: T;
    /** data 是否是数组 */
    isArray?: boolean;
    /** 设置为 true, 则 data 类型为 { list, total } ,  false data 类型是纯数组 */
    isPager?: boolean;
}

/**
 * 封装 swagger 返回统一结构
 * 支持复杂类型 {  code, msg, data, success }
 * @param model 返回的 data 的数据类型
 * @param isArray data 是否是数组
 * @param isPager 设置为 true, 则 data 类型为 { list, total } ,  false data 类型是纯数组
 */
export const ApiResult = <TModel extends Type<any>>(props: ApiResultProps<TModel>) => {
    const { model, isArray, isPager } = props;
    let items = null;
    const modalIsBaseType = model && baseTypeNames.includes((model as any)?.name);
    if (modalIsBaseType) {
        items = { type: (model as any)?.name?.toLocaleLowerCase() };
    } else {
        items = { $ref: getSchemaPath(model) };
    }
    let prop = null;
    if (isArray && isPager) {
        prop = {
            type: 'object',
            properties: {
                list: {
                    type: 'array',
                    items,
                },
                total: {
                    type: 'number',
                    default: 0,
                },
            },
        };
    } else if (isArray) {
        prop = {
            type: 'array',
            items,
        };
    } else if (model) {
        prop = items;
    } else {
        prop = { type: 'null', default: null };
    }
    return applyDecorators(
        ApiExtraModels(...(model && !modalIsBaseType ? [ResultData, model] : [ResultData])),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResultData) },
                    {
                        properties: {
                            data: prop,
                        },
                    },
                ],
            },
        }),
    );
};
