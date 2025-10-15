import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';

const about = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await productCategoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);
  const pageUrl = createPageUrlHelper(req);

  res.render('./client/pages/about/about.view.ejs', {
    pageTitle: 'Giới thiệu',
    pageUrl: pageUrl,
    categoryTree: categoryTree,
  });
};

const aboutController = { about };

export default aboutController;
