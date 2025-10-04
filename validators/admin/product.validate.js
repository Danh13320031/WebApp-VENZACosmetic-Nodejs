import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createProductValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
    res.redirect('back');
    return;
  }

  // Check category
  if (!req.body.category) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn danh mục');
    res.redirect('back');
    return;
  }

  // Check detail
  if (!req.body.detail) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả chi tiết');
    res.redirect('back');
    return;
  }

  // Check price
  if (!req.body.price) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập giá tiền');
    res.redirect('back');
    return;
  }

  // Check shipping fee
  if (!req.body.shipping_fee) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng phí vận chuyển');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  next();
};

const updateProductValidate = (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tiêu đề');
    res.redirect('back');
    return;
  }

  // Check category
  if (!req.body.category) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn danh mục');
    res.redirect('back');
    return;
  }

  // Check detail
  if (!req.body.detail) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả chi tiết');
    res.redirect('back');
    return;
  }

  // Check price
  if (!req.body.price) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập giá tiền');
    res.redirect('back');
    return;
  }

  // Check shipping fee
  if (!req.body.shipping_fee) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng phí vận chuyển');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  next();
};

const productValidate = {
  createProductValidate,
  updateProductValidate,
};

export default productValidate;
