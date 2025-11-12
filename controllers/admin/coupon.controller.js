import moment from 'moment-timezone';
import { couponCodePrefixRule, notFoundPage, timezone } from '../../constants/constant.js';
import generateCouponCodeHelper from '../../helpers/admin/coupon/generateCouponCode.helper.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import couponModel from '../../models/coupon.model.js';
import { StatusCodes } from '../../node_modules/http-status-codes/build/cjs/status-codes.js';

// GET: /admin/coupons
const coupon = async (req, res) => {
  try {
    const find = { deleted: false };
    const couponList = await couponModel.find(find).sort({ createdAt: 'desc' });

    res.render(
      './admin/pages/coupon/coupon.view.ejs',
      { pageTitle: 'Danh sách mã giảm giá', couponList },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/coupons/create
const createCouponGet = async (req, res) => {
  try {
    res.render(
      './admin/pages/coupon/create.view.ejs',
      { pageTitle: 'Tạo mới mã giảm giá', couponCodePrefixRule },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// POST: /admin/coupons/create
const createCouponPost = async (req, res) => {
  try {
    const countRecord = await couponModel.countDocuments();

    if (req.body.prefixCode) req.body.code = generateCouponCodeHelper(req.body.prefixCode);
    if (req.body.value) req.body.value = Number.parseFloat(req.body.value);
    if (req.body.minAmount) req.body.minAmount = Number.parseFloat(req.body.minAmount);
    if (req.body.limit) req.body.limit = Number.parseInt(req.body.limit);
    if (req.body.limitPerUser) req.body.limitPerUser = Number.parseInt(req.body.limitPerUser);
    if (req.body.startedAt) req.body.startedAt = moment(req.body.startedAt).tz(timezone).toDate();
    if (req.body.endedAt) req.body.endedAt = moment(req.body.endedAt).tz(timezone).toDate();
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    else req.body.position = countRecord + 1;

    const newCoupon = new couponModel(req.body);
    await newCoupon.save();

    alertMessageHelper(req, 'alertSuccess', 'Tạo thành công');
    res.redirect('back');
    return;
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// GET: /admin/coupons/update/:id
const updateCouponGet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      const err = new Error('Không tìm thay đối tuần');
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }

    const find = { _id: id, deleted: false };
    const coupon = await couponModel.findOne(find);

    res.render(
      './admin/pages/coupon/update.view.ejs',
      { pageTitle: 'Cập nhật mã giảm giá', coupon },
      (err, html) => {
        if (err) handleErrorHelper(req, res, err);
        res.send(html);
      }
    );
  } catch (error) {
    handleErrorHelper(req, res, error);
  }
};

// PATCH: /admin/coupons/update/:id?_method=PATCH
const updateCouponPatch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.redirect(notFoundPage);
      return;
    }

    if (req.body.startedAt) req.body.startedAt = moment(req.body.startedAt).tz(timezone).toDate();
    else delete req.body.startedAt;

    if (req.body.endedAt) req.body.endedAt = moment(req.body.endedAt).tz(timezone).toDate();
    else delete req.body.endedAt;

    if (req.body.value) req.body.value = Number.parseFloat(req.body.value);
    if (req.body.minAmount) req.body.minAmount = Number.parseFloat(req.body.minAmount);
    if (req.body.position) req.body.position = Number.parseInt(req.body.position);
    if (req.body.limit) req.body.limit = Number.parseInt(req.body.limit);
    if (req.body.limitPerUser) req.body.limitPerUser = Number.parseInt(req.body.limitPerUser);

    await couponModel.findByIdAndUpdate(id, req.body);
    alertMessageHelper(req, 'alertSuccess', 'Cập nhật thông tin');
    res.redirect('back');
  } catch (error) {
    console.log('Update coupon fail: ', error);
    alertMessageHelper(req, 'alertFailure', 'Cập nhật thất bại');
    res.redirect('back');
    return;
  }
};

const couponController = {
  coupon,
  createCouponGet,
  createCouponPost,
  updateCouponGet,
  updateCouponPatch,
};

export default couponController;
