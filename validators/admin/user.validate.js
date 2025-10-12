import { emailRegex, passwordRegex, phoneRegex } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import userModel from '../../models/user.model.js';

const createUserValidate = async (req, res, next) => {
  const fieldExisted = await userModel.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  // Check fullName
  if (!req.body.fullname) {
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

  if (!req.body.password) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mật khẩu');
    res.redirect('back');
    return;
  }
  if (!regexPassword.test(req.body.password)) {
    alertMessageHelper(req, 'alertFailure', 'Mật khẩu không hợp lệ');
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
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check exist email and phone
  if (fieldExisted) {
    alertMessageHelper(req, 'alertFailure', 'Email / Phone đã được đăng ký');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check isVerified
  if (!req.body.isVerified) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn xác minh');
    res.redirect('back');
    return;
  }

  next();
};

const updateUserValidate = async (req, res, next) => {
  const fieldExisted = await userModel.findOne({
    _id: { $ne: req.params.id },
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  // Check fullname
  if (!req.body.fullname) {
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
    alertMessageHelper(req, 'alertFailure', 'Mật khẩu không hợp lệ');
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
    alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check exist email and phone
  if (fieldExisted) {
    alertMessageHelper(req, 'alertFailure', 'Email / Phone đã được đăng ký');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check isVerified
  if (!req.body.isVerified) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn xác minh');
    res.redirect('back');
    return;
  }

  next();
};

const userValidate = {
  createUserValidate,
  updateUserValidate,
};

export default userValidate;
