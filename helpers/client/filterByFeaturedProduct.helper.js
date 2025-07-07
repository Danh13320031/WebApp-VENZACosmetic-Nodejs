const filterByFeaturedProductHelper = (reqQuery) => {
  const objFeaturedProduct = {};

  if (reqQuery.featured) {
    objFeaturedProduct.flag = reqQuery.featured === 'true' ? true : '';
  }

  return objFeaturedProduct;
};

export default filterByFeaturedProductHelper;
