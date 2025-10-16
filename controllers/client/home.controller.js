import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import productCategoryModel from '../../models/productCategory.model.js';
import productModel from '../../models/product.model.js';

// GET: /
const home = async (req, res) => {
  const find = { status: 'active', deleted: false };
  const categoryList = await productCategoryModel.find(find);
  const productList = await productModel.find(find).sort({ createdAt: 'desc' });
  const categoryTree = categoryTreeHelper(categoryList);

  // Product like filter
  const productLike = res.locals.productLike;
  if (productLike && productLike.products.length > 0) {
    productList.forEach((product) => {
      const productLikeItem = productLike.products.find(
        (productLikeItem) => productLikeItem.product_id === product._id.toString()
      );

      if (productLikeItem) {
        product.isLike = true;
      }
    });
  }

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
