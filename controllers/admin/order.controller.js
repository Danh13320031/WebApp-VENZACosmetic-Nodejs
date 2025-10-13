import ejs from 'ejs';
import { emailConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import priceFilterHelper from '../../helpers/priceFilter.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import orderModel from '../../models/order.model.js';
import userModel from '../../models/user.model.js';
import productModel from '../../models/product.model.js';

// GET: /admin/accounts
const order = async (req, res) => {
  try {
    const find = { deleted: false };

    // Search
    const objSearch = searchHelper(req.query);
    if (objSearch.rexKeywordString) find.orderCode = objSearch.rexKeywordString;

    // Status Filter
    const statusList = [
      { name: 'Tất cả', class: '', status: '' },
      { name: 'Chờ xác nhận', class: '', status: 'pending' },
      { name: 'Đã xác nhận', class: '', status: 'confirmed' },
      { name: 'Đang giao', class: '', status: 'shipping' },
      { name: 'Đã giao', class: '', status: 'delivered' },
      { name: 'Đã hủy', class: '', status: 'cancelled' },
    ];

    const activeStatus = statusFilterHelper(req.query, statusList);
    if (req.query.status) find.status = req.query.status;

    // Sort
    const sort = sortHelper(req.query);
    const sortValue = Object.keys(sort)[0] + '-' + Object.values(sort)[0];

    // Price Filter
    const valueRange = priceFilterHelper(req.query);
    if (req.query.min && req.query.max) {
      find.$and = [{ total: { $gt: valueRange.min } }, { total: { $lt: valueRange.max } }];
    }

    // Pagination
    const paginationObj = {
      limit: 8,
      currentPage: 1,
    };
    const productTotal = await orderModel.countDocuments(find);
    const objPagination = paginationHelper(req.query, paginationObj, productTotal);

    const orderList = await orderModel
      .find(find)
      .sort(sort)
      .limit(objPagination.limit)
      .skip(objPagination.productSkip);

    res.render('./admin/pages/order/order.view.ejs', {
      pageTitle: 'Danh sách đơn hàng',
      orderList: orderList,
      keyword: objSearch.keyword,
      activeStatus,
      sortValue,
      valueRange,
      objPagination,
      statusList,
    });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

// PATCH: /admin/orders/order-change-status/:status/:id?_method=PATCH
const changeStatusOrder = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id || !status) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    const order = await orderModel.findById(id).select('orderCode userInfo');

    if (!order) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    const html = await ejs.renderFile('./views/admin/pages/order/notifyMail.view.ejs', {
      clientWebsite: res.locals.clientWebsite,
      orderCode: order.orderCode,
      status: status,
    });

    await sendMailHelper(emailConst, 'VENZA - Cập nhật trạng thái đơn hàng', html);

    await orderModel.findByIdAndUpdate(id, { status: status });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
  } catch (err) {
    console.log('Update order fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/orders/order-change-payment/:status/:id?_method=PATCH
const changeStatusPayment = async (req, res) => {
  try {
    const { id, status } = req.params;

    if (!id || !status) {
      alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
      res.redirect('back');
      return;
    }

    await orderModel.findByIdAndUpdate(id, { 'payments.status': status });
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật trạng thái thành công');
  } catch (err) {
    console.log('Update order fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// PATCH: /admin/orders/change-multi?_method=PATCH
const changeMultiOrder = async (req, res) => {
  try {
    if (req.body.type && req.body.ids) {
      const { type, ids } = req.body;
      const idsArr = ids.split(', ');

      switch (type) {
        case 'pending': {
          try {
            await orderModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'pending' } });
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'confirmed': {
          try {
            await orderModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'confirmed' } }
            );
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'shipping': {
          try {
            await orderModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'shipping' } });
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'delivered': {
          try {
            await orderModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'delivered' } }
            );
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'cancelled': {
          try {
            await orderModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { status: 'cancelled' } }
            );
            alertMessageHelper(req, 'alertSuccess', `Cập nhật trạng thái thành công`);
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Cập nhật trạng thái bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'soft-delete': {
          try {
            await orderModel.updateMany(
              { _id: { $in: idsArr } },
              { $set: { deleted: true, deletedAt: new Date() } }
            );
            alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'restore': {
          try {
            await orderModel.updateMany({ _id: { $in: idsArr } }, { $set: { deleted: false } });
            alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        case 'hard-delete': {
          try {
            await orderModel.deleteMany({ _id: { $in: idsArr } });
            alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
          } catch (err) {
            alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
          } finally {
            res.redirect('back');
            break;
          }
        }
        default:
          break;
      }

      const orderList = await orderModel
        .find({ _id: { $in: idsArr } })
        .select('userInfo orderCode status');

      if (orderList.length > 0) {
        for (const order of orderList) {
          const html = await ejs.renderFile('./views/admin/pages/order/notifyMail.view.ejs', {
            clientWebsite: res.locals.clientWebsite,
            orderCode: order.orderCode,
            status: order.status,
          });

          await sendMailHelper(emailConst, 'VENZA - Cập nhật trạng thái đơn hàng', html);
        }
      }
    }
  } catch (err) {
    console.log('Change multi status fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
    return;
  }
};

// PATCH: /admin/orders/delete/:id?_method=PATCH
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await orderModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// GET: /admin/orders/garbage
const garbageOrder = async (req, res) => {
  const find = { deleted: true };

  const orderList = await orderModel.find(find).sort({ deletedAt: 'desc' });

  res.render('./admin/pages/order/garbage.view.ejs', {
    pageTitle: 'Thùng rác đơn hàng',
    orderList,
    statusList: [],
  });
};

// PATCH: /admin/orders/restore-garbage/:id?_method=PATCH
const restoreOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.redirect('back');
    alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
    return;
  }

  try {
    await orderModel.findByIdAndUpdate(id, { deleted: false });
    alertMessageHelper(req, 'alertSuccess', 'Khôi phục thành công');
  } catch (err) {
    console.log('Restore category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Khôi phục thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// DELETE: /admin/orders/delete-garbage/:id?_method=DELETE
const deleteGarbageOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.redirect('back');
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
    return;
  }

  try {
    await orderModel.findByIdAndDelete(id);
    alertMessageHelper(req, 'alertSuccess', 'Xóa thành công');
  } catch (err) {
    console.log('Delete category fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Xóa thất bại');
  } finally {
    res.redirect('back');
    return;
  }
};

// GET: /admin/orders/detail/:id
const detailOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.redirect('back');
    alertMessageHelper(req, 'alertFailure', 'Ko tìm thấy đơn hàng');
    return;
  }

  const order = await orderModel.findById(id);

  if (!order) {
    res.redirect('back');
    alertMessageHelper(req, 'alertFailure', 'Ko tìm thấy đơn hàng');
    return;
  }

  const userOrder = await userModel.findById(order.userOrderInfo.user_id);

  let productListInOrder = [];
  let productList = [];
  let orderTotal = 0;

  for (const productOrder of order.products) {
    const productInfo = await productModel.findById(productOrder.product_id);
    const product = {};

    product.id = productOrder.product_id;
    product.price = productOrder.price;
    product.title = productOrder.title;
    product.thumbnail = productOrder.thumbnail;
    product.brand = productOrder.brand;
    product.warranty = productOrder.warranty;
    product.dimension = productOrder.dimension;
    product.discount = productOrder.discount;
    product.quantity = productOrder.quantity;
    product.total =
      (productOrder.price - (productOrder.price * productOrder.discount) / 100) *
      productOrder.quantity;

    orderTotal += product.total;
    productListInOrder.push(product);
    productList.push(productInfo);
  }

  // Search
  let keywordStr = '';
  const objSearch = searchHelper(req.query);

  if (objSearch.rexKeywordString) keywordStr = objSearch.rexKeywordString;
  productListInOrder = productListInOrder.filter((product) => product.title.match(keywordStr));

  // Pagination
  const paginationObj = {
    limit: 4,
    currentPage: 1,
  };
  const productTotal = productListInOrder.length;
  const objPagination = paginationHelper(req.query, paginationObj, productTotal);

  productListInOrder = productListInOrder.slice(
    objPagination.productSkip,
    objPagination.productSkip + objPagination.limit
  );

  res.render('./admin/pages/order/detail.view.ejs', {
    pageTitle: `Đơn hàng ${order.orderCode}`,
    orderDetail: order,
    userOrder,
    productList,
    productListInOrder,
    orderTotal,
    keyword: objSearch.keyword,
    objPagination,
  });
};

const orderController = {
  order,
  changeStatusOrder,
  changeStatusPayment,
  changeMultiOrder,
  deleteOrder,
  garbageOrder,
  restoreOrder,
  deleteGarbageOrder,
  detailOrder,
};

export default orderController;
