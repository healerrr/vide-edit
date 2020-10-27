const List = [
  {
    uuid: "@uuid",
    icon: "file-pdf-line",
    title: "pdf打印",
    price: "0",
    type: "组件",
    isRecommend: 1,
  },
];

module.exports = [
  {
    url: "/goods/getList",
    type: "get",
    response(config) {
      const { title, pageNo = 1, pageSize = 20 } = config.query;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      );
      return {
        code: 200,
        msg: "success",
        totalCount: mockList.length,
        data: pageList,
      };
    },
  },
];
