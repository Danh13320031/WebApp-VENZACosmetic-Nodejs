import couponModel from '../../../models/coupon.model.js';

const getCouponListHelper = async (cart, productIdCartList, productBrandCartList) => {
  const minAmount = cart && cart.totalPrice ? cart.totalPrice : 0;
  const find = {
    deleted: false,
    status: 'active',
    published: true,
    minAmount: { $lte: minAmount },
  };
  let couponList = await couponModel.find(find).sort({ createdAt: 'desc' });

  if (!couponList || couponList.length === 0) return [];

  // Handle coupon for product
  couponList = couponList.filter((coupon) => {
    if (coupon.scope === 'all') return true;

    if (coupon.scope === 'product')
      return productIdCartList.some((productId) => coupon.appliedIds.includes(productId));

    if (coupon.scope === 'brand')
      return productBrandCartList.some((brandId) => coupon.appliedIds.includes(brandId));

    return false;
  });

  return couponList;
};

export default getCouponListHelper;
