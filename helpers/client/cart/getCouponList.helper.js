import couponModel from '../../../models/coupon.model.js';
import userCouponModel from '../../../models/userCoupon.model.js';

const getCouponListHelper = async (cart, productIdCartList, productBrandCartList, user) => {
  const userId = user ? user._id : null;
  const minAmount = cart && cart.total ? cart.total : 0;
  const find = {
    deleted: false,
    status: 'active',
    published: true,
    minAmount: { $lte: minAmount },
  };
  let couponList = await couponModel.find(find).sort({ createdAt: 'desc' });
  const userCouponList = await userCouponModel.find({ user_id: userId, deleted: false });

  if (!couponList || couponList.length === 0) return [];

  // Handle coupon for product
  couponList = couponList.filter((coupon) => {
    if (coupon.scope === 'all') return true;

    if (coupon.scope === 'product')
      return productIdCartList.some((productId) => coupon.appliedIds.includes(productId));

    if (coupon.scope === 'brand')
      return productBrandCartList.some((brandId) => coupon.appliedIds.includes(brandId));

    const userCoupon = userCouponList
      ? userCouponList.find((userCoupon) => userCoupon.coupon_id === coupon._id)
      : null;
    if (!userCoupon) return false;
    if (userCoupon.usedCount < coupon.limitPerUser) return true;

    return false;
  });

  return couponList;
};

export default getCouponListHelper;
