import moment from 'moment-timezone';
import { timezone } from '../../constants/constant.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import productModel from '../../models/product.model.js';

const createCouponValidate = async (req, res, next) => {
  // Check prefix code type
  if (!req.body.prefixCode) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mã khuyến mãi');
    res.redirect('back');
    return;
  }

  // Check value
  if (!req.body.value) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập giá trị khuyến mãi');
    res.redirect('back');
    return;
  }

  // Check min amout order
  const productList = await productModel
    .find({ deleted: false })
    .sort({ price: 'asc' })
    .limit(1)
    .select('price');

  if (!req.body.minAmount) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số tiền tối thiểu');
    res.redirect('back');
    return;
  }

  if (Number(req.body.minAmount) < productList[0].price) {
    alertMessageHelper(req, 'alertFailure', `Số tiền tối thiểu phải > ${productList[0].price} VNĐ`);
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check value type
  if (!req.body.valueType) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn loại giá trị');
    res.redirect('back');
    return;
  }

  // Check public type
  if (!req.body.publishType) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn loại khuyến mãi');
    res.redirect('back');
    return;
  }

  // Check started at
  if (!req.body.startedAt) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn thời gian bắt đầu');
    res.redirect('back');
    return;
  }
  if (moment(req.body.startedAt).tz(timezone).isBefore(moment().tz(timezone))) {
    alertMessageHelper(req, 'alertFailure', 'Thời gian bắt đầu không hợp lệ');
    res.redirect('back');
    return;
  }

  // Check end at
  if (!req.body.endedAt) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn thời gian kết thúc');
    res.redirect('back');
    return;
  }
  if (moment(req.body.endedAt).tz(timezone).isBefore(moment(req.body.startedAt).tz(timezone))) {
    alertMessageHelper(req, 'alertFailure', 'Thời gian kết thúc không hợp lệ');
    res.redirect('back');
    return;
  }

  next();
};

const updateCouponValidate = (req, res, next) => {
  // Check code
  if (!req.body.code) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mã khuyến mãi');
    res.redirect('back');
    return;
  }

  // Check value
  if (!req.body.value) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập giá trị khuyến mãi');
    res.redirect('back');
    return;
  }

  // Check min amout order
  if (!req.body.minAmount) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập số tiền tối thiểu');
    res.redirect('back');
    return;
  }

  // Check description
  if (!req.body.description) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mô tả');
    res.redirect('back');
    return;
  }

  // Check status
  if (!req.body.status) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn trạng thái');
    res.redirect('back');
    return;
  }

  // Check value type
  if (!req.body.valueType) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn loại giá trị');
    res.redirect('back');
    return;
  }

  // Check public type
  if (!req.body.publishType) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng chọn loại khuyến mãi');
    res.redirect('back');
    return;
  }

  if (
    moment(req.body.startedAt).tz(timezone).toDate() >=
    moment(req.body.endedAt).tz(timezone).toDate()
  ) {
    alertMessageHelper(req, 'alertFailure', 'Thời gian bắt đầu không hợp lệ');
    res.redirect('back');
    return;
  }

  next();
};

const couponValidate = {
  createCouponValidate,
  updateCouponValidate,
};

export default couponValidate;
