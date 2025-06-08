import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import getSubCategoryHelper from '../../helpers/getSubCategory.helper.js';
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

// GET: /products/categories/:categorySlug
const getProductByCategory = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categorySlug = req.params.categorySlug;
  const categoryList = await categoryModel.find(find);
  const categoryTree = categoryTreeHelper(categoryList);

  const category = await categoryModel.findOne({
    slug: categorySlug,
    status: 'active',
    deleted: false,
  });

  const subCategoryList = await getSubCategoryHelper(category._id);
  const subCategoryIdList = subCategoryList.map((subCategory) => subCategory._id);

  const productCategoryList = await productModel
    .find({
      category: { $in: [category._id, ...subCategoryIdList] },
      status: 'active',
      deleted: false,
    })
    .sort({ position: 'desc' });

  res.render('./client/pages/product/product.view.ejs', {
    pageTitle: 'Danh sách sản phẩm',
    categoryTree: categoryTree,
    productList: productCategoryList,
  });
};

const productController = {
  product,
  getProductByCategory,
};

export default productController;
