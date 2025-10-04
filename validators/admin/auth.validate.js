import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const loginPostValidate = async (req, res, next) => {
  // Check email
  if (!req.body.email) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập email');
    res.redirect('back');
    return;
  }

  // Check password
  if (!req.body.password) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mật khẩu');
    res.redirect('back');
    return;
  }

  next();
};

const authValidate = {
  loginPostValidate,
};

export default authValidate;
