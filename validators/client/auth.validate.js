import bcript from 'bcrypt';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import userModel from '../../models/user.model.js';

const registerPostValidate = async (req, res, next) => {
  try {
    // Check email
    const userExisted = await userModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    const regexEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    if (!req.body.email) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chi email');
      res.redirect('back');
      return;
    }
    if (userExisted) {
      if (userExisted.isVerified) {
        alertMessageHelper(req, 'alertFailure', 'Email đã được đăng ký');
        res.redirect('back');
        return;
      }
      await userModel.findByIdAndDelete(userExisted._id);
    }
    if (!regexEmail.test(req.body.email)) {
      alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
      res.redirect('back');
      return;
    }

    // Check password
    const regexPassword = new RegExp(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    );

    if (!req.body.password) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mật khẩu');
      res.redirect('back');
      return;
    }
    if (!regexPassword.test(req.body.password)) {
      alertMessageHelper(req, 'alertFailure', 'Mật khẩu không hợp lệ');
      res.redirect('back');
      return;
    }

    // Check confirm password
    if (!req.body.confirmPassword) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng xác nhận mật khẩu');
      res.redirect('back');
      return;
    }
    if (req.body.confirmPassword !== req.body.password) {
      alertMessageHelper(req, 'alertFailure', 'Mật khẩu không khớp');
      res.redirect('back');
      return;
    }

    // Check phone
    const regexPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

    if (!req.body.phone) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số điện thoại');
      res.redirect('back');
      return;
    }
    if (!regexPhone.test(req.body.phone)) {
      alertMessageHelper(req, 'alertFailure', 'Số điện thoại không hợp lệ');
      res.redirect('back');
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const loginPostValidate = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

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

    if (!user) {
      alertMessageHelper(req, 'alertFailure', 'Email hoặc mật khẩu không đúng');
      res.redirect('back');
      return;
    } else {
      const checkPassword = await bcript.compare(req.body.password, user.password);

      if (!checkPassword) {
        alertMessageHelper(req, 'alertFailure', 'Email hoặc mật khẩu không đúng');
        res.redirect('back');
        return;
      }

      if (!user.isVerified) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản chưa được kích hoạt');
        res.redirect('/register');
        return;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const authValidate = {
  registerPostValidate,
  loginPostValidate,
};

export default authValidate;
