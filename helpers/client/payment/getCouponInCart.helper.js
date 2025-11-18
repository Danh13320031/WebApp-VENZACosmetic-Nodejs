import couponModel from '../../../models/coupon.model.js';

const getCouponInCartHelper = async (cart, total) => {
  const coupons = {
    coupon_id: null,
    code: '',
    discountAmount: 0,
    valueType: 'amount',
    value: 0,
    minAmount: 0,
    maxDiscountAmount: 0,
    description: '',
  };

  if (!cart.coupon_id) return { coupons, total };

  const coupon = await couponModel.findOne({
    _id: cart.coupon_id,
    deleted: false,
    status: 'active',
    published: true,
  });

  if (!coupon) return { coupons, total };

  coupons.coupon_id = coupon._id;
  coupons.code = coupon.code || '';
  coupons.discountAmount = cart.couponAmount || 0;
  coupons.valueType = coupon.valueType || 'amount';
  coupons.value = coupon.value || 0;
  coupons.minAmount = coupon.minAmount || 0;
  coupons.maxDiscountAmount = coupon.valueType === 'percent' ? coupon.maxDiscountAmount || 0 : 0;
  coupons.description = coupon.description || '';

  total = cart.finalTotal;

  return { coupons, total };
};

export default getCouponInCartHelper;
