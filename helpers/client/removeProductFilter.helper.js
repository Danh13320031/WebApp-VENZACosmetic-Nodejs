const removeProductFilterHelper = (reqQuery) => {
  const removeFilterArr = [
    {
      keyword: 'search',
      title: 'Tìm kiếm',
      query: reqQuery.keyword,
    },
    {
      keyword: 'category',
      title: 'Danh mục',
      query: reqQuery.category,
    },
    {
      keyword: 'price',
      title: 'Mức giá',
      query: reqQuery.to,
    },
    {
      keyword: 'freeship',
      title: 'Miễn phái vận chuyển',
      query: reqQuery.freeship,
    },
    {
      keyword: 'sale',
      title: 'Đang giảm giá',
      query: reqQuery.sale,
    },
    {
      keyword: 'featured',
      title: 'Đang nổi bật',
      query: reqQuery.featured,
    },
    {
      keyword: 'quantity',
      title: 'Số lượng',
      query: reqQuery.quantity,
    },
  ];

  return removeFilterArr;
};

export default removeProductFilterHelper;
