import couponModel from '../../../models/coupon.model.js';
import userCouponModel from '../../../models/userCoupon.model.js';

const updateCouponAfterOrderHelper = async (couponId, userId) => {
  if (!couponId) return;

  await couponModel.updateOne({ _id: couponId }, { $inc: { limit: -1 } });

  const userCoupon = await userCouponModel.findOne({
    user_id: userId,
    coupon_id: couponId,
    deleted: false,
  });

  if (userCoupon) {
    userCoupon.usedCount += 1;
    await userCoupon.save();
  } else {
    await new userCouponModel({
      user_id: userId,
      coupon_id: couponId,
      usedCount: 1,
    }).save();
  }
};

export default updateCouponAfterOrderHelper;
