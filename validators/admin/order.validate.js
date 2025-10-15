import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const updateOrderPatchValidate = (req, res, next) => {
  // Check order
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }
  if (!req.body.address) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ giao hàng');
    res.redirect('back');
    return;
  }

  // Check payment
  if (!req.body.paymentStatus) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái thanh toán');
    res.redirect('back');
    return;
  }

  // Check user consignee
  if (!req.body.userConsigneeName) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên người nhận hàng');
    res.redirect('back');
    return;
  }
  if (!req.body.userConsigneePhone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại người nhận hàng');
    res.redirect('back');
    return;
  }
  if (!req.body.userConsigneeEmail) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập email người nhận hàng');
    res.redirect('back');
    return;
  }

  next();
};

const orderValidate = {
  updateOrderPatchValidate,
};

export default orderValidate;
