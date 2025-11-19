import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import handleFlashSaleHelper from '../../helpers/client/home/handleFlashSale.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import couponModel from '../../models/coupon.model.js';
import postModel from '../../models/post.model.js';
import productModel from '../../models/product.model.js';
import productBrandModel from '../../models/productBrand.model.js';
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

    // Handle product brand
    const productBrandList = await productBrandModel
      .find(find)
      .sort({ createdAt: 'desc' })
      .select('-status -deleted -createdAt -updatedAt');

    // Handle featured product
    const productFeatureList = productList.filter((product) => {
      if (product.featured === '1') return product;
    });

    // Handle coupon
    const findCoupon = { ...find, published: true };
    const couponList = await couponModel.find(findCoupon).sort({ createdAt: 'desc' });

    // Handle sale product
    const productSaleList = productList.filter((product) => {
      if (product.discount !== 0) return product;
    });

    // Handle flash sale product
    const flashSaleProduct = handleFlashSaleHelper(productList);
    const productFlashSaleList = flashSaleProduct.productFlashSaleList;
    const productFlashSaleDuration = flashSaleProduct.productFlashSaleDuration;

    // Handle post
    const findPost = { status: 'active', deleted: false, published: true };
    const postList = await postModel
      .find(findPost)
      .sort({ createdAt: 'desc' })
      .select('-content')
      .limit(3);

    // Handle post featured
    const postFeatured = await postModel
      .findOne({
        ...findPost,
        featured: '1',
      })
      .limit(1)
      .sort({ createdAt: 'desc' })
      .select('-content');

    res.render(
      './client/pages/home/index.view.ejs',
      {
        pageTitle: 'Trang chủ',
        categoryTree: categoryTree,
        productBrandList,
        productFeatureList,
        productSaleList,
        couponList,
        productFlashSaleList,
        productList: productList,
        productFlashSaleDuration,
        postList: postList,
        postFeatured: postFeatured,
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
