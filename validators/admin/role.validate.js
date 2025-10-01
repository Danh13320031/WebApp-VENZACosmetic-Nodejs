import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createRoleValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên quyền');
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả');
    res.redirect('back');
    return;
  }

  next();
};

const updateRoleValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui nhập tên quyền');
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui nhập mô tả');
    res.redirect('back');
    return;
  }

  next();
};

const roleValidate = {
  createRoleValidate,
  updateRoleValidate,
};

export default roleValidate;
