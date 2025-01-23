/*
 * @Author: laotianwy 1695657342@qq.com
 * @Date: 2025-01-23 20:50:33
 * @LastEditors: laotianwy 1695657342@qq.com
 * @LastEditTime: 2025-01-23 20:50:42
 * @FilePath: /mock-api-serve/src/utils/transResToListData.util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface queryProps {
    pageSize: string | number;
    pageNum: string | number;
}

interface transReponseListDataProps {
    data: any;
    total: number;
    query: queryProps;
}

const transReponseListData = (props: transReponseListDataProps) => {
    const { data, total, query } = props;
    return {
        list: data,
        total,
        pageNum: Number(query.pageNum),
        pageSize: Number(query.pageSize),
    };
};

export default transReponseListData;
