import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import { emailRegex, passwordRegex } from '../../constants/constant.js';

const loginPostValidate = async (req, res, next) => {
  // Check email
  const regexEmail = new RegExp(emailRegex);

  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập email');
    res.redirect('back');
    return;
  }
  if (!regexEmail.test(req.body.email)) {
    alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
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

  next();
};

const authValidate = {
  loginPostValidate,
};

export default authValidate;
