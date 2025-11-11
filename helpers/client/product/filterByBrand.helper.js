const filterByBrandHelper = (reqQuery, productBrandList) => {
  const brandListString = reqQuery.brand ? reqQuery.brand : '';
  let brandList = [];

  brandListString ? (brandList = brandListString.split(',')) : [];

  const productBrandListFilter = productBrandList.filter((brand) => brandList.includes(brand.slug));

  return productBrandListFilter;
};

export default filterByBrandHelper;
