import { notFoundPage } from '../../constants/constant.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';

// GET: /
const home = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const productList = await productModel.find(find).sort({ createdAt: 'desc' });
    const categoryTree = categoryTreeHelper(categoryList);

    // Handle product like
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

    res.render(
      './client/pages/home/index.view.ejs',
      {
        pageTitle: 'Trang chủ',
        categoryTree: categoryTree,
        productList: productList,
      },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

const homeController = {
  home,
};

export default homeController;
