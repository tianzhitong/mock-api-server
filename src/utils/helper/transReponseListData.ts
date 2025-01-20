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
