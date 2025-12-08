import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';
import handleBestSellingProductHelper from '../../helpers/admin/dashboard/handleBestSellingProduct.helper.js';
import handleHighestRevenueProductHelper from '../../helpers/admin/dashboard/handleHighestRevenueProduct.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import accountModel from '../../models/account.model.js';
import couponModel from '../../models/coupon.model.js';
import orderModel from '../../models/order.model.js';
import postModel from '../../models/post.model.js';
import productModel from '../../models/product.model.js';
import productBrandModel from '../../models/productBrand.model.js';
import productCategoryModel from '../../models/productCategory.model.js';
import productCommentModel from '../../models/productComment.model.js';
import roleModel from '../../models/role.model.js';
import userModel from '../../models/user.model.js';
import handleHighestOrderHelper from '../../helpers/admin/dashboard/handleHighestOrder.helper.js';

// GET: /admin/dashobard
const dashboard = async (req, res) => {
  try {
    // Handle data statistic
    const startDate = moment().tz(timezone).startOf('day').toDate();
    const endDate = moment().tz(timezone).endOf('day').toDate();

    const productTotalInStock = await productModel.countDocuments({
      deleted: false,
      stock: { $gt: 0 },
    });
    const userTotalActive = await userModel.countDocuments({ deleted: false, status: 'active' });
    const unpublishedPostTotal = await postModel.countDocuments({
      deleted: false,
      published: false,
      status: 'active',
    });
    const orderTotalPerDay = await orderModel.countDocuments({
      deleted: false,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const startMonth = moment().tz(timezone).startOf('month').toDate();
    const endMonth = moment().tz(timezone).endOf('month').toDate();

    // Handle best selling product in month
    const bestSellingProductObj = await handleBestSellingProductHelper(startMonth, endMonth);

    // Handle highest revenue product in month
    const highestRevenueProductObj = await handleHighestRevenueProductHelper(startMonth, endMonth);

    // Handle highest revenue order in month
    const highestOrderObj = await handleHighestOrderHelper(startMonth, endMonth);

    // Handle data statistic chart
    const productDataTotal = await productModel.countDocuments({ deleted: false });
    const productCategoryDataTotal = await productCategoryModel.countDocuments({ deleted: false });
    const productBrandDataTotal = await productBrandModel.countDocuments({ deleted: false });
    const productCommentDataTotal = await productCommentModel.countDocuments({ deleted: false });
    const accountDataTotal = await accountModel.countDocuments({ deleted: false });
    const userDataTotal = await userModel.countDocuments({ deleted: false });
    const roleDataTotal = await roleModel.countDocuments({ deleted: false });
    const orderDataTotal = await orderModel.countDocuments({ deleted: false });
    const couponDataTotal = await couponModel.countDocuments({ deleted: false });
    const postDataTotal = await postModel.countDocuments({ deleted: false });

    const chartData = {
      data: [
        productDataTotal,
        productCategoryDataTotal,
        productBrandDataTotal,
        productCommentDataTotal,
        accountDataTotal,
        userDataTotal,
        roleDataTotal,
        orderDataTotal,
        couponDataTotal,
        postDataTotal,
      ],
      labels: [
        'Sản phẩm',
        'Danh mục sản phẩm',
        'Thương hiệu',
        'Bình luận sản phẩm',
        'Quản trị viên',
        'Người dùng',
        'Vai trò quản trị',
        'Đơn hàng',
        'Mã giảm giá',
        'Bài viết',
      ],
    };

    res.render(
      './admin/pages/dashboard/dashboard.view.ejs',
      {
        pageTitle: 'Trang tổng quan',
        productTotalInStock,
        userTotalActive,
        unpublishedPostTotal,
        orderTotalPerDay,
        bestSellingProductList: bestSellingProductObj.bestSellingProductList,
        bestSellingProductChart: bestSellingProductObj.chartData,
        highestRevenueProductList: highestRevenueProductObj.highestRevenueProductList,
        highestRevenueProductChart: highestRevenueProductObj.chartData,
        highestOrderList: highestOrderObj.highestOrderList,
        highestOrderChart: highestOrderObj.chartData,
        chartData,
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

const dashboardController = {
  dashboard,
};

export default dashboardController;
