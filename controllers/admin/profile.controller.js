import bcrypt from 'bcrypt';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

const saltRounds = 10;

// GET: /admin/profile     --Tới trang thông tin tài khoản
const profile = async (req, res) => {
  res.render('./admin/pages/profile/profile.view.ejs', {
    pageTitle: 'Thông tin tài khoản',
  });
};

// GET: /admin/profile/update     --Tới trang chỉnh sửa thông tin tài khoản
const updateProfileGet = async (req, res) => {
  res.render('./admin/pages/profile/update.view.ejs', {
    pageTitle: 'Chỉnh sửa thông tin tài khoản',
  });
};

// PATCH: /admin/profile/update?_method=PATCH     --Cập nhật thông tin tài khoản
const updateProfilePatch = async (req, res) => {
  try {
    const id = res.locals.account._id;
    const hassPassword = await bcrypt.hash(req.body.password, saltRounds);

    if (req.body.password) req.body.password = hassPassword;

    await accountModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thành công');
  } catch (err) {
    console.log('Create product fail: ', err);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
  } finally {
    res.redirect('back');
  }
};

const profileController = {
  profile,
  updateProfileGet,
  updateProfilePatch,
};

export default profileController;
