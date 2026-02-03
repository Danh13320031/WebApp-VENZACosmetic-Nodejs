import { phoneRegex } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createPaymentValidate = (req, res, next) => {
  if (!req.body.fullname) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên người nhận');
    res.redirect('back');
    return;
  }

  const regexPhone = new RegExp(phoneRegex);

  if (!req.body.phone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return;
  }
  if (!regexPhone.test(req.body.phone)) {
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  if (!req.body.address) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ');
    res.redirect('back');
    return;
  }

  if (!req.body.payment_method) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn phương thức thanh toán');
    res.redirect('back');
    return;
  }

  // if (!req.body.shipping_method) {
  //   alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn phương thức vận chuyển');
  //   res.redirect('back');
  //   return;
  // }

  next();
};

const paymentValidate = {
  createPaymentValidate,
};

export default paymentValidate;
