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

  const orderList = await orderModel.find(find).sort({ createdAt: 'desc' });

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
  });
};

const orderController = {
  order,
};

export default orderController;
