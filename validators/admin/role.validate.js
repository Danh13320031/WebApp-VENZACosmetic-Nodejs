import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createRoleValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên quyền');
    res.redirect('back');
  }

  next();
};

const roleValidate = {
  createRoleValidate,
};

export default roleValidate;
