import systemConfig from '../../configs/system.config.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import accountModel from '../../models/account.model.js';
import roleModel from '../../models/role.model.js';
import settingGeneralModel from '../../models/setting-general.model.js';

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      alertMessageHelper(req, 'alertFailure', 'Không tồn tại token');
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    const accountLogin = await accountModel.findOne({ token });

    if (!accountLogin) {
      alertMessageHelper(req, 'alertFailure', 'Token không hợp lệ');
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    const roleAuth = await roleModel
      .findOne({ _id: accountLogin.roleId })
      .select('title permission');
    res.locals.accountLogin = accountLogin;
    res.locals.roleAuth = roleAuth;

    next();
  } catch (error) {
    console.log(error);
  }
};

const authMiddleware = {
  requireAuth,
};

export default authMiddleware;
