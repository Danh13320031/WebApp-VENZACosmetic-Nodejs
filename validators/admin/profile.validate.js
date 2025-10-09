import { emailRegex, passwordRegex, phoneRegex } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

const updateProfileValidate = async (req, res, next) => {
  const fieldExisted = await accountModel.findOne({
    _id: { $ne: res.locals.accountLogin._id },
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  // Check fullName
  if (!req.body.fullName) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập Họ & Tên');
    res.redirect('back');
    return;
  }

  // Check email
  const regexEmail = new RegExp(emailRegex);

  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ email');
    res.redirect('back');
    return;
  }
  if (!regexEmail.test(req.body.email)) {
    alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check password
  const regexPassword = new RegExp(passwordRegex);

  if (req.body.password && !regexPassword.test(req.body.password)) {
    alertMessageHelper(req, 'alertFailure', 'Mật khẩu không hợp lệ');
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
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check exist email and phone
  if (fieldExisted) {
    alertMessageHelper(req, 'alertFailure', 'Email / Phone đã được đăng ký');
    res.redirect('back');
    return;
  }

  // Check birthDay
  if (!req.body.birthDay) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập ngày sinh');
    res.redirect('back');
    return;
  }

  next();
};

const profileValidate = {
  updateProfileValidate,
};

export default profileValidate;
