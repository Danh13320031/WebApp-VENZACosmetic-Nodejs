import bcrypt from 'bcrypt';
import { saltRoundsConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import categoryTreeHelper from '../../helpers/categoryTree.helper.js';
import createPageUrlHelper from '../../helpers/client/createPageUrl.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import orderModel from '../../models/order.model.js';
import productModel from '../../models/product.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import userModel from '../../models/user.model.js';

// [GET]: /user/profile
const updateProfileGet = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);

    res.render('./client/pages/user/profile.view.ejs', {
      pageTitle: 'Thông tin tài khoản',
      pageUrl: pageUrl,
      categoryTree: categoryTree,
    });
  } catch (err) {
    console.log('Display user profile fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Not Found');
    res.redirect('back');
    return;
  }
};

// [PATCH]: /user/profile?_method=PATCH
const updateProfilePatch = async (req, res) => {
  try {
    const id = res.locals.user._id ? res.locals.user._id : null;

    if (!id) {
      res.redirect('back');
      alertMessageHelper(req, 'alertFailure', 'Cập nhật tài khoản thất bại');
      return;
    }

    if (!req.body.avatar) {
      delete req.body.avatar;
    }

    if (!req.body.password) {
      delete req.body.password;
    } else {
      const hassPassword = await bcrypt.hash(req.body.password, saltRoundsConst);
      req.body.password = hassPassword;
    }
    delete req.body.confirmPassword;

    await userModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật tài khoản thành công');
    res.redirect('back');
  } catch (err) {
    console.log('Update user fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật tài khoản thất bại');
    res.redirect('back');
  }
};

const historyGet = async (req, res) => {
  try {
    const find = { status: 'active', deleted: false };
    const categoryList = await productCategoryModel.find(find);
    const categoryTree = categoryTreeHelper(categoryList);
    const pageUrl = createPageUrlHelper(req);

    // Handle favorite product list history
    const productList = await productModel.find(find).sort({ createdAt: 'desc' });

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

    let productWithLikeList = productList.filter((product) => product.isLike === true);

    // Pagination
    const paginationObj = {
      limit: 5,
      currentPage: 1,
    };
    const productTotal = productWithLikeList.length;
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    productWithLikeList = productWithLikeList.slice(
      objPagination.productSkip,
      objPagination.productSkip + objPagination.limit
    );

    // Handle order list history
    const user = res.locals.user ? res.locals.user : null;
    const userEmail = user.email ? user.email : null;
    let orderList = await orderModel
      .find({ deleted: false, 'userOrderInfo.email': userEmail })
      .sort({ createdAt: 'desc' });

    orderList = orderList.slice(
      objPagination.productSkip,
      objPagination.productSkip + objPagination.limit
    );

    res.render('./client/pages/user/history.view.ejs', {
      pageTitle: 'Nhật ký hoạt động',
      pageUrl: pageUrl,
      categoryTree: categoryTree,
      productWithLikeList: productWithLikeList,
      orderList: orderList,
      objPagination: objPagination,
    });
  } catch (err) {
    console.log('Display user history fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Not Found');
    res.redirect('back');
    return;
  }
};

const userController = {
  updateProfileGet,
  updateProfilePatch,
  historyGet,
};

export default userController;
