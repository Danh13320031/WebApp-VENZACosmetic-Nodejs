import bcrypt from 'bcrypt';
import { saltRoundsConst } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';

// GET: /admin/profile/update     --Tới trang chỉnh sửa thông tin tài khoản
const updateProfileGet = async (req, res) => {
  res.render('./admin/pages/profile/update.view.ejs', {
    pageTitle: 'Chỉnh sửa thông tin tài khoản',
  });
};

// PATCH: /admin/profile/update?_method=PATCH     --Cập nhật thông tin tài khoản
const updateProfilePatch = async (req, res) => {
  try {
    const id = res.locals.accountLogin._id;

    if (req.body.password && req.body.password !== '') {
      const hassPassword = await bcrypt.hash(req.body.password, saltRoundsConst);
      req.body.password = hassPassword;
    } else {
      delete req.body.password;
    }

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
  updateProfileGet,
  updateProfilePatch,
};

export default profileController;
