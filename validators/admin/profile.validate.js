import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

const updateProfileValidate = async (req, res, next) => {
  const fieldExisted = await accountModel.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
    deleted: false,
  });

  // Check fullName
  if (!req.body.fullName) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập Họ & Tên');
    res.redirect('back');
    return;
  }

  // Check email
  const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

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
  if (!req.body.password) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mật khẩu');
    res.redirect('back');
    return;
  }

  // Check phone
  if (!req.body.phone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return;
  }

  // Check exist email and phone
  if (fieldExisted !== null) {
    if (fieldExisted.email !== req.body.email || fieldExisted.phone !== req.body.phone) {
      alertMessageHelper(req, 'alertFailure', 'Email / Phone đã được đăng ký');
      res.redirect('back');
      return;
    }
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
