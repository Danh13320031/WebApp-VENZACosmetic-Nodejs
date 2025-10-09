import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import priceFilterHelper from '../../helpers/priceFilter.helper.js';
import searchHelper from '../../helpers/search.helper.js';
import sortHelper from '../../helpers/sort.helper.js';
import statusFilterHelper from '../../helpers/statusFilter.helper.js';
import orderModel from '../../models/order.model.js';
import userModel from '../../models/user.model.js';

// GET: /admin/accounts
const order = async (req, res) => {
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
    { name: 'Đã thanh toán', class: '', status: 'paid' },
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

  if (orderList.length > 0) {
    for (let i = 0; i < orderList.length; i++) {
      const user = await userModel.findById(orderList[i].user_id);

      orderList[i].userOrderName = user.fullname;
      orderList[i].userOrderEmail = user.email;
    }
  }

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
        case 'paid': {
          try {
            await orderModel.updateMany({ _id: { $in: idsArr } }, { $set: { status: 'paid' } });
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
    } else {
      res.redirect('back');
    }
  } catch (err) {
    console.log('Change multi status fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Thay đổi thất bại');
    res.redirect('back');
  }
};

const orderController = {
  order,
  changeMultiOrder,
};

export default orderController;
