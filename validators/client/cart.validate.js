import alertMessageHelper from '../../helpers/alertMessagge.helper.js';

const applyCouponToCartValidate = (req, res, next) => {
  // Check coupon code
  if (!req.body.couponCode) {
    alertMessageHelper(req, 'alertFailure', 'Vui lòng nhập mã giảm giá');
    res.redirect('back');
    return;
  }

  next();
};

const cartValidate = {
  applyCouponToCartValidate,
};

export default cartValidate;
