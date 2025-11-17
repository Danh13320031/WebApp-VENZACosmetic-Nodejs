import couponModel from '../../../models/coupon.model.js';
import userCouponModel from '../../../models/userCoupon.model.js';

const handleOrderCouponHelper = async (cart, total, userId) => {
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

  if (cart.coupon_id) {
    const coupon = await couponModel.findOne({
      _id: cart.coupon_id,
      deleted: false,
      status: 'active',
      published: true,
    });

    if (coupon) {
      coupons.coupon_id = coupon._id;
      coupons.code = coupon.code || '';
      coupons.discountAmount = cart.couponAmount || 0;
      coupons.valueType = coupon.valueType || 'amount';
      coupons.value = coupon.value || 0;
      coupons.minAmount = coupon.minAmount || 0;
      coupons.maxDiscountAmount =
        coupon.valueType === 'percent' ? coupon.maxDiscountAmount || 0 : 0;
      coupons.description = coupon.description || '';

      const userCoupon = await userCouponModel.findOne({
        user_id: userId,
        coupon_id: cart.coupon_id,
        deleted: false,
      });

      if (userCoupon) {
        userCoupon.usedCount += 1;
        await userCoupon.save();
      } else {
        await new userCouponModel({
          user_id: userId,
          coupon_id: cart.coupon_id,
          usedCount: 1,
        }).save();
      }

      total = cart.finalTotal;
    } else {
      total = cart.total;
    }
  } else {
    total = cart.total;
  }

  return { coupons, total };
};

export default handleOrderCouponHelper;
