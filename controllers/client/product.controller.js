import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import categoryModel from '../../models/category.model.js';
import productModel from '../../models/product.model.js';

// GET: /products
const product = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await categoryModel.find(find);
  const productList = await productModel.find(find).sort({ createdAt: 'desc' });
  const categoryTree = categoryTreeHelper(categoryList);

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
    productList: productList,
  });
};

const productController = {
  product,
};

export default productController;
