import { emailRegex, phoneRegex } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const contactPostValidate = (req, res, next) => {
  // Check fullname
  if (!req.body.fullname) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập họ tên');
    res.redirect('back');
    return;
  }

  // Check email
  const regexEmail = new RegExp(emailRegex);

  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập email');
    res.redirect('back');
    return;
  }
  if (!regexEmail.test(req.body.email)) {
    alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check phone
  const regexPhone = new RegExp(phoneRegex);

  if (!req.body.phone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return;
  }
  if (!regexPhone.test(req.body.phone)) {
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check message
  if (!req.body.message) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập nội dung');
    res.redirect('back');
    return;
  }

  next();
};

const contactValidate = {
  contactPostValidate,
};

export default contactValidate;
