import categoryModel from '../../models/category.model.js';
import getSubCategoryHelper from '../getSubCategory.helper.js';

const filterByCategoryHelper = async (reqQuery) => {
  if (!reqQuery.category) return 0;

  const category = await categoryModel
    .findOne({
      slug: reqQuery.category,
      status: 'active',
      deleted: false,
    })
    .select('_id title');

  if (!category) return 0;

  const subCategoryList = await getSubCategoryHelper(category._id);
  const subCategoryIdList = subCategoryList.map((subCategory) => subCategory._id);

  return {
    categoryId: category._id,
    categoryTitle: category.title,
    subCategoryIdList: subCategoryIdList,
  };
};

export default filterByCategoryHelper;
