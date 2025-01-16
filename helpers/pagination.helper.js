const paginationHelper = (reqQuery, objPagination, productTotal) => {
  if (reqQuery.page) {
    objPagination.currentPage = Number.parseInt(reqQuery.page);
  }

  const pageTotal = Math.ceil(productTotal / objPagination.limit);
  objPagination.pageTotal = pageTotal;

  const productSkip = (objPagination.currentPage - 1) * objPagination.limit;
  if (Number.isNaN(productSkip)) objPagination.productSkip = 0;
  else objPagination.productSkip = productSkip;

  return objPagination;
};

export default paginationHelper;
