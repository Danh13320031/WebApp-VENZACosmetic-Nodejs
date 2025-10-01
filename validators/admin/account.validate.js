import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

const createAccountValidate = async (req, res, next) => {
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
  const regexPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

  if (!req.body.phone) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return;
  }

  if (!regexPhone.test(req.body.phone)) {
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check exist email and phone
  if (fieldExisted !== null) {
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

  // Check role id
  if (!req.body.roleId) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn quyền');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  next();
};

const updateAccountValidate = async (req, res, next) => {
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
  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ email');
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

  // Check role id
  if (!req.body.roleId) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn quyền');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  next();
};

const accountValidate = {
  createAccountValidate,
  updateAccountValidate,
};

export default accountValidate;
