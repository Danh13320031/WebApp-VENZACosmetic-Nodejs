import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { saltRoundsConst } from '../../constants/account.constant.js';
import {
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
  verifyTokenExpiresIn,
} from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
import cartModel from '../../models/cart.model.js';
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
      process.env.GOOGLE_USER_EMAIL,
      'VENZA - KÍCH HOẠT TÀI KHOẢN',
      `<h1>Kích hoạt tài khoản</h1><a href="${link}">Click vào đây</a>`
    );

    res.redirect(
      `http://${process.env.HOSTNAME}:${process.env.PORT}/register-verify/${user.email}/${verifyTokenExpiresIn}`
    );
  } catch (error) {
    console.log(error);
  }
};

// [GET]: /register-verify/:email/:duration
const registerVerifyGet = async (req, res) => {
  try {
    const email = req.params.email;
    const duration = req.params.duration;

    res.render('./client/pages/auth/register-verify.view.ejs', {
      pageTitle: 'Kích hoạt tài khoản',
      email: email,
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
    const cartId = req.cookies.cartId ? req.cookies.cartId : null;

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

    if (cartId) {
      await cartModel.findByIdAndUpdate(cartId, { user_id: user._id });
    }

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
    const cartId = req.cookies.cartId ? req.cookies.cartId : null;

    if (cartId) {
      await cartModel.findByIdAndUpdate(cartId, { user_id: null });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    alertMessageHelper(req, 'alertSuccess', 'Đăng xuất thành công');
    res.redirect('/login');
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
};

export default authController;
