import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import accountModel from '../../models/account.model.js';
import categoryModel from '../../models/category.model.js';

// GET: /products
const product = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
  });
};

const productController = {
  product,
};

export default productController;
