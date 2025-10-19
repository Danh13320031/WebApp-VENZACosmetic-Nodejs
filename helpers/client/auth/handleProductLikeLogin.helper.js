import { maxAgeProductLikeStorage } from '../../../constants/constant.js';
import productLikeModel from '../../../models/productLike.model.js';

const handleProductLikeLoginHelper = async (req, res, user) => {
  const productLikeId = req.cookies.productLikeId || null;
  let userProductLike = await productLikeModel.findOne({ user_id: user._id });
  let guestProductLike = null;

  if (productLikeId) {
    guestProductLike = await productLikeModel.findById(productLikeId);
  }

  if (guestProductLike && !guestProductLike.user_id) {
    if (!userProductLike) {
      guestProductLike.user_id = user._id;
      await guestProductLike.save();
      userProductLike = guestProductLike;
    } else {
      guestProductLike.products.forEach((gp) => {
        const existing = userProductLike.products.find((up) => up.product_id === gp.product_id);

        if (existing) {
          existing.likedAt = gp.likedAt;
        } else {
          userProductLike.products.push(gp);
        }
      });

      await userProductLike.save();
      await guestProductLike.deleteOne();
    }
  }

  if (!userProductLike) {
    userProductLike = new productLikeModel({ user_id: user._id, products: [] });
    await userProductLike.save();
  }

  res.cookie('productLikeId', userProductLike._id, {
    httpOnly: true,
    maxAge: maxAgeProductLikeStorage,
  });
};

export default handleProductLikeLoginHelper;
