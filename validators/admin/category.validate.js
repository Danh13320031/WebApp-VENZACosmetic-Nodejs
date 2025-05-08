import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createCategoryValidate = (req, res, next) => {
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
    res.redirect('back');
  }

  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
  }

  next();
};

const updateCategoryValidate = (req, res, next) => {
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
    res.redirect('back');
  }

  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
  }
  next();
};

const categoryValidate = {
  createCategoryValidate,
  updateCategoryValidate,
};

export default categoryValidate;
