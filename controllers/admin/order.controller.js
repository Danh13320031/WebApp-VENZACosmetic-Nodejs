// GET: /admin/accounts
const order = (req, res) => {
  res.render('./admin/pages/order/order.view.ejs', {
    pageTitle: 'Danh sách đơn hàng',
  });
};

const orderController = {
  order,
};

export default orderController;
