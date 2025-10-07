import bcript from 'bcrypt';
import { emailRegex, otpRegex, passwordRegex, phoneRegex } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import otpModel from '../../models/otp.model.js';
import userModel from '../../models/user.model.js';

const registerPostValidate = async (req, res, next) => {
  try {
    // Check email
    const userExisted = await userModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    const regexEmail = new RegExp(emailRegex);

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
    const regexPassword = new RegExp(passwordRegex);

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
    const regexPhone = new RegExp(phoneRegex);

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

    const user = await userModel.findOne({ email: req.body.email });

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

      if (user.status === 'inactive') {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị khóa');
        res.redirect('back');
        return;
      }

      if (user.deleted === true) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị xóa');
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

const forgotPasswordPostValidate = async (req, res, next) => {
  try {
    // Check email
    const regexEmail = new RegExp(emailRegex);

    if (!req.body.email) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ email');
      res.redirect('back');
      return;
    }
    if (!regexEmail.test(req.body.email)) {
      alertMessageHelper(req, 'alertFailure', 'Email không hợp lệ');
      res.redirect('back');
      return;
    }

    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      alertMessageHelper(req, 'alertFailure', 'Email chưa được đăng ký');
      res.redirect('back');
      return;
    } else {
      if (user.status === 'inactive') {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị khoá');
        res.redirect('back');
        return;
      }

      if (user.deleted === true) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị xóa');
        res.redirect('back');
        return;
      }

      if (!user.isVerified) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản chưa được kích hoạt');
        res.redirect('back');
        return;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const checkOtpValidate = async (req, res, next) => {
  try {
    if (!req.query.email) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập địa chỉ email');
      res.redirect('back');
      return;
    }

    const regexOtp = new RegExp(otpRegex);

    if (!req.body.otp1 || !req.body.otp2 || !req.body.otp3 || !req.body.otp4 || !req.body.otp5) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập OTP');
      res.redirect('back');
      return;
    }

    const otpString = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4 + req.body.otp5;

    if (!regexOtp.test(otpString)) {
      alertMessageHelper(req, 'alertFailure', 'OTP không hợp lệ');
      res.redirect('back');
      return;
    }

    const otp = await otpModel.findOne({ email: req.query.email });

    if (!otp) {
      alertMessageHelper(req, 'alertFailure', 'OTP đã hết hiệu lực');
      res.redirect('back');
      return;
    }

    if (Date.now() > otp.expiredAt) {
      alertMessageHelper(req, 'alertFailure', 'OTP đã hết hiệu lực');
      res.redirect('back');
      return;
    }

    if (otpString !== otp.otp) {
      alertMessageHelper(req, 'alertFailure', 'OTP không hợp lệ');
      res.redirect('back');
      return;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordPostValidate = async (req, res, next) => {
  try {
    // Check token
    if (!req.cookies.refreshToken) {
      alertMessageHelper(req, 'alertFailure', 'Token không hợp lệ');
      res.redirect('back');
      return;
    }

    // Check password
    const regexPassword = new RegExp(passwordRegex);

    if (!req.body.password) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mật khẩu');
      res.redirect('back');
      return;
    }
    if (!regexPassword.test(req.body.password)) {
      alertMessageHelper(req, 'alertFailure', 'Mật khẩu không hợp lệ');
      res.redirect('back');
      return;
    }

    // Check confirm password
    if (!req.body.confirmPassword) {
      alertMessageHelper(req, 'alertFailure', 'Vui lòng xác nhận mật khẩu');
      res.redirect('back');
      return;
    }
    if (req.body.password !== req.body.confirmPassword) {
      alertMessageHelper(req, 'alertFailure', 'Mật khẩu xác nhận không khớp');
      res.redirect('back');
      return;
    }

    const user = await userModel.findOne({ refreshToken: req.cookies.refreshToken });

    if (!user) {
      alertMessageHelper(req, 'alertFailure', 'Email chưa được đăng ký');
      res.redirect('back');
      return;
    } else {
      if (user.status === 'inactive') {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị khoá');
        res.redirect('back');
        return;
      }

      if (user.deleted === true) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị xóa');
        res.redirect('back');
        return;
      }

      if (!user.isVerified) {
        alertMessageHelper(req, 'alertFailure', 'Tài khoản chưa được kích hoạt');
        res.redirect('back');
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
  forgotPasswordPostValidate,
  checkOtpValidate,
  resetPasswordPostValidate,
};

export default authValidate;
