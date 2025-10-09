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

  const orderList = await orderModel.find(find).sort(sort);

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
  });
};

const orderController = {
  order,
};

export default orderController;
