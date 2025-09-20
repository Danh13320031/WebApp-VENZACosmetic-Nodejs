import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { saltRoundsConst } from '../../constants/account.constant.js';
import { verifyTokenExpiresIn } from '../../constants/constant.js';
import sendMailHelper from '../../helpers/sendMail.helper.js';
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

const regiterVerifyPatch = async (req, res) => {
  try {
    const token = req.params.verifyToken;
    const decode = jwt.verify(token, process.env.JWT_VERIFY_TOKEN_SECRET);
    const user = await userModel.findById(decode.id);

    await userModel.findByIdAndUpdate(user._id, { isVerified: true });
    res.send('OK');
  } catch (error) {
    console.log(error);
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
  const body = req.body;
  console.log(body);

  res.send('OK');
};

const authController = {
  registerGet,
  registerPost,
  registerVerifyGet,
  regiterVerifyPatch,
  loginGet,
  loginPost,
};

export default authController;
