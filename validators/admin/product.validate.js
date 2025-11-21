import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';
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

  // Check discount expired at
  if (
    moment(req.body.discountExpiredAt).tz(timezone).format('YYYY-MM-DDTHH:mm') <=
    moment(Date.now()).tz(timezone).format('YYYY-MM-DDTHH:mm')
  ) {
    alertMessageHelper(req, 'alertFailure', 'Hạn giảm giá không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check thumbnail
  if (!req.body.thumbnail || req.body.thumbnail.length === 0) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn hình anh');
    res.redirect('back');
    return;
  }

  // Check images
  if (!req.body.images || req.body.images.length < 1 || req.body.images.length > 4) {
    alertMessageHelper(req, 'alertFailure', 'Phải có tối thiểu 1 hình ảnh');
    res.redirect('back');
    return;
  }

  // Check brand
  if (!req.body.brand_id) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn thương hiệu');
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

  // Check discount expired at
  if (!req.body.discountExpiredAt) delete req.body.discountExpiredAt;
  else {
    if (
      moment(req.body.discountExpiredAt).tz(timezone).format('YYYY-MM-DDTHH:mm') <
      moment(Date.now()).tz(timezone).format('YYYY-MM-DDTHH:mm')
    ) {
      delete req.body.discountExpiredAt;
    }
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check images
  if (!req.body.images && !req.body.oldImages) {
    alertMessageHelper(req, 'alertFailure', 'Phải có ít nhất 1 hình ảnh phụ');
    res.redirect('back');
    return;
  }

  // Check brand
  if (!req.body.brand_id) {
    alertMessageHelper(req, 'alertFailure', 'Vui lí chọn thương hiệu');
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
