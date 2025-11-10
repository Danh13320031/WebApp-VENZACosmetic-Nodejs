import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const createProductBrandPostValidate = async (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên thương hiệu');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả');
    res.redirect('back');
    return;
  }

  // Check image
  if (!req.file) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn logo');
    res.redirect('back');
    return;
  }

  next();
};

const updateProductBrandPatchValidate = async (req, res, next) => {
  // Check title
  if (!req.body.title) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập tên thương hiệu');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả');
    res.redirect('back');
    return;
  }

  next();
};

const productBrandValidate = {
  createProductBrandPostValidate,
  updateProductBrandPatchValidate,
};

export default productBrandValidate;
