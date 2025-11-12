import { couponCodePrefixRule } from '../../constants/constant.js';
import generateCouponCodeHelper from '../../helpers/admin/coupon/generateCouponCode.helper.js';
import alertMessageHelper from '../../helpers/alertMessagge.helper.js';
import handleErrorHelper from '../../helpers/handleError.helper.js';
import couponModel from '../../models/coupon.model.js';

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

const couponController = {
  coupon,
  createCouponGet,
  createCouponPost,
};

export default couponController;
