const filterByFeaturedHelper = (reqQuery) => {
  const objFeatured = {};

  if (reqQuery.featured) {
    objFeatured.flag = reqQuery.featured === 'true' ? true : '';
  }

  return objFeatured;
};

export default filterByFeaturedHelper;
