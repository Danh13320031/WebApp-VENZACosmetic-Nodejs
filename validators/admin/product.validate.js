import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createProductValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
    res.redirect('back');
  }

  // Check category
  if (!req.body.category) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn danh mục');
    res.redirect('back');
  }

  // Check price
  if (!req.body.price) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập giá tiền');
    res.redirect('back');
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
  }

  next();
};

const productValidate = {
  createProductValidate,
};

export default productValidate;
