import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';
import productModel from '../../models/product.model.js';

// GET: /
const home = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await productCategoryModel.find(find);
  const productList = await productModel.find(find).sort({ createdAt: 'desc' });
  const categoryTree = categoryTreeHelper(categoryList);

  res.render('./client/pages/home/index.view.ejs', {
    pageTitle: 'Trang chủ',
    categoryTree: categoryTree,
    productList: productList,
  });
};

const homeController = {
  home,
};

export default homeController;
