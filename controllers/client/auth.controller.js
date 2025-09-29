import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {
  accessTokenExpiresIn,
  emailConst,
  maxAgeCartStorage,
  otpExpiresIn,
  refreshTokenExpiresIn,
  saltRoundsConst,
  verifyTokenExpiresIn,
} from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import generateOtpHelper from '../../helpers/generateOtp.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import cartModel from '../../models/cart.model.js';
import otpModel from '../../models/otp.model.js';
import userModel from '../../models/user.model.js';

// [GET]: /register
const registerGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/register.view.ejs', { pageTitle: 'Đăng ký' });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

// [POST]: /register
const registerPost = async (req, res) => {
  try {
    const body = req.body;
    const hashPassword = await bcrypt.hash(body.password, saltRoundsConst);
    body.password = hashPassword;

    const user = new userModel(body);
    await user.save();

    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_VERIFY_TOKEN_SECRET, {
      expiresIn: verifyTokenExpiresIn,
    });
    const link = `http://${process.env.HOSTNAME}:${process.env.PORT}/register-change-isverified/${verifyToken}`;

    await sendMailHelper(
      emailConst,
      'VENZA - KÍCH HOẠT TÀI KHOẢN',
      `<h1>Kích hoạt tài khoản</h1><a href="${link}">Click vào đây</a>`
    );

    res.redirect(
      `http://${process.env.HOSTNAME}:${process.env.PORT}/register-verify/?duration=${verifyTokenExpiresIn}`
    );
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /register-verify/:email/:duration
const registerVerifyGet = async (req, res) => {
  try {
    const duration = req.query.duration;

    res.render('./client/pages/auth/register-verify.view.ejs', {
      pageTitle: 'Kích hoạt tài khoản',
      duration: duration,
    });
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /register-change-isverified/:verifyToken
const regiterVerifyPatch = async (req, res) => {
  try {
    const token = req.params.verifyToken;
    const decode = jwt.verify(token, process.env.JWT_VERIFY_TOKEN_SECRET);
    const user = await userModel.findById(decode.id);

    await userModel.findByIdAndUpdate(user._id, { isVerified: true });

    alertMessageHelper(req, 'alertSuccess', 'Kích hoạt tài khoản thành công');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Kích hoạt tài khoản thất bại');
    res.redirect('/register');
    return;
  }
};

// [GET]: /login
const loginGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/login.view.ejs', { pageTitle: 'Đăng nhập' });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

// [POST]: /login-create
const loginPost = async (req, res) => {
  try {
    const find = { email: req.body.email, deleted: false, status: 'active' };
    const user = await userModel.findOne(find);

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.jWT_REFRESH_TOKEN_SECRET, {
      expiresIn: refreshTokenExpiresIn,
    });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: accessTokenExpiresIn });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: refreshTokenExpiresIn });

    user.refreshToken = refreshToken;
    await user.save();

    // Xử lý cart
    const cartId = req.cookies.cartId || null;
    let userCart = await cartModel.findOne({ user_id: user._id });
    let guestCart = null;

    if (cartId) {
      guestCart = await cartModel.findById(cartId);
    }

    if (guestCart && !guestCart.user_id) {
      if (!userCart) {
        guestCart.user_id = user._id;
        await guestCart.save();
        userCart = guestCart;
      } else {
        guestCart.products.forEach((gp) => {
          const existing = userCart.products.find((up) => up.product_id === gp.product_id);

          if (existing) {
            existing.quantity += gp.quantity;
          } else {
            userCart.products.push(gp);
          }
        });

        await userCart.save();
        await guestCart.deleteOne();
      }
    }

    if (!userCart) {
      userCart = new cartModel({ user_id: user._id, products: [] });
      await userCart.save();
    }

    res.cookie('cartId', userCart._id, { httpOnly: true, maxAge: maxAgeCartStorage });
    alertMessageHelper(req, 'alertSuccess', 'Đăng nhập thành công');
    res.redirect('/');
    return;
  } catch (error) {
    console.log(error);
    alertMessageHelper(req, 'alertFailure', 'Email hoặc mật khẩu không đúng');
  }
};

// [GET]: /logout
const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('cartId');

    const guestCart = new cartModel({ user_id: null, products: [] });
    await guestCart.save();
    res.cookie('cartId', guestCart._id, {
      httpOnly: true,
      maxAge: maxAgeCartStorage,
    });

    alertMessageHelper(req, 'alertSuccess', 'Đăng xuất thành công');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /forgot-password
const forgotPasswordGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/forgot-password.view.ejs', { pageTitle: 'Quên mật khẩu' });
  } catch (error) {
    console.log(error);
  }
};

// [POST]: /forgot-password-create
const forgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const find = { email: email, deleted: false, status: 'active', isVerified: true };
    const user = await userModel.findOne(find);
    const otp = await otpModel.findOne({ email: email });

    if (otp) {
      await otpModel.findByIdAndDelete(otp._id);
    }

    const otpRandom = generateOtpHelper(5);
    const otpObj = {
      email: user.email,
      otp: otpRandom,
      expiredAt: Date.now() + otpExpiresIn,
    };

    const newOtp = new otpModel(otpObj);
    await newOtp.save();

    sendMailHelper(
      emailConst,
      'VENZA - LẤY LẠI MẬT KHẨU',
      `<span>Mã xác nhận của bạn là: <h1>${otpRandom}</h1></span>`
    );

    alertMessageHelper(req, 'alertSuccess', 'Kiểm tra email để nhận OTP');
    res.redirect(`/forgot-password-otp?email=${email}`);
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /forgot-password-otp
const enterOTP = async (req, res) => {
  try {
    const email = req.query.email;

    res.render('./client/pages/auth/forgot-password-otp.view.ejs', {
      pageTitle: 'Xác thực OTP',
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

// [POST]: /forgot-password-check-otp
const checkOtp = async (req, res) => {
  const email = req.query.email;
  const otp1 = req.body.otp1;
  const otp2 = req.body.otp2;
  const otp3 = req.body.otp3;
  const otp4 = req.body.otp4;
  const otp5 = req.body.otp5;
  const otpString = `${otp1}${otp2}${otp3}${otp4}${otp5}`;
  const otp = await otpModel.findOne({ email: email });

  if (otp.otp === otpString) {
    await otpModel.findByIdAndDelete(otp._id);

    const user = await userModel.findOne({ email: email });
    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpiresIn,
    });

    alertMessageHelper(req, 'alertSuccess', 'Xác thức OTP thành công');
    res.redirect(`/forgot-password-reset`);
  }
};

// [GET]: /forgot-password-reset
const resetPasswordGet = async (req, res) => {
  try {
    res.render('./client/pages/auth/forgot-password-reset.view.ejs', {
      pageTitle: 'Đổi mật khẩu',
    });
  } catch (error) {
    console.log(error);
  }
};

// [POST]: /forgot-password-reset-create
const resetPasswordPost = async (req, res) => {
  try {
    const refeshToken = req.cookies.refreshToken;
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRoundsConst);

    await userModel.findOneAndUpdate({ refreshToken: refeshToken }, { password: hashPassword });

    alertMessageHelper(req, 'alertSuccess', 'Đổi mật khẩu thành công');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

const authController = {
  registerGet,
  registerPost,
  registerVerifyGet,
  regiterVerifyPatch,
  loginGet,
  loginPost,
  logout,
  forgotPasswordGet,
  forgotPasswordPost,
  enterOTP,
  checkOtp,
  resetPasswordGet,
  resetPasswordPost,
};

export default authController;
