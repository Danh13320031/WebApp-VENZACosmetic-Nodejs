import bcrypt from 'bcrypt';
import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

// GET: /admin/auth/login     --Tới trang đăng nhập
const loginGet = async (req, res) => {
  try {
    if (req.cookies.token) res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    else
      res.render('./admin/pages/auth/login.view.ejs', {
        pageTitle: 'Đăng nhập',
      });
  } catch (err) {
    console.log('Not found: ', err);
  }
};

// POST: /admin/auth/login     --Tới trang đăng nhập
const loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const maxAge = 3 * 24 * 60 * 60 * 1000;
  const find = { email, deleted: false };
  const account = await accountModel.findOne(find).select('email password status token');

  try {
    if (!account) {
      alertMessageHelper(req, 'alertFailure', 'Email chưa được đăng ký');
      res.redirect('back');
      return;
    }

    const passwordCompare = await bcrypt.compare(password, account.password);

    if (account.email !== email || passwordCompare === false) {
      alertMessageHelper(req, 'alertFailure', 'Email / Password không chính xác');
      res.redirect('back');
      return;
    }

    if (account.status === 'inactive') {
      alertMessageHelper(req, 'alertFailure', 'Tài khoản đã bị khóa');
      res.redirect('back');
      return;
    }

    res.cookie('token', account.token, {
      httpOnly: true,
      maxAge: maxAge,
      secure: true,
    });
    alertMessageHelper(req, 'alertSuccess', 'Đăng nhập thành công');
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } catch (err) {
    console.log('Login fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Đăng nhập thất bại');
    res.redirect('back');
  }
};

// GET: /admin/auth/logout     --Đăng xuất
const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    alertMessageHelper(req, 'alertSuccess', 'Đăng xuất thành công');
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } catch (err) {
    console.log('Logout fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Đăng xuất thất bại');
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }
};

const authController = {
  loginGet,
  loginPost,
  logout,
};

export default authController;
