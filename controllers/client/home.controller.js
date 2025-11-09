import { timezone, productFlashSaleDurationMsConst } from '../../constants/constant.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import moment from '../../node_modules/moment/moment.js';

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

    const productFeatureList = productList.filter((product) => {
      if (product.featured === '1') return product;
    });

    const productSaleList = productList.filter((product) => {
      if (product.discount !== 0) return product;
    });

    const productFlashSaleList = productList.filter((product) => {
      if (
        product.discount !== 0 &&
        product.discountExpiredAt !== null &&
        product.discountExpiredAt - moment(Date.now()).tz(timezone).toDate() <
          productFlashSaleDurationMsConst
      )
        return product;
    });

    const productDiscountExpiredAtMax = await productModel
      .find(find)
      .sort({ discountExpiredAt: 'desc' })
      .limit(1);

    const duration = moment.duration(
      productDiscountExpiredAtMax[0].discountExpiredAt - moment(Date.now()).tz(timezone).toDate()
    );

    const productFlashSaleDuration = {
      dayNumber: duration.days(),
      hourNumber: duration.hours(),
      minuteNumber: duration.minutes(),
      secondNumber: duration.seconds(),
    };

    res.render(
      './client/pages/home/index.view.ejs',
      {
        pageTitle: 'Trang chủ',
        categoryTree: categoryTree,
        productFeatureList,
        productSaleList,
        productFlashSaleList,
        productList: productList,
        productFlashSaleDuration,
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
