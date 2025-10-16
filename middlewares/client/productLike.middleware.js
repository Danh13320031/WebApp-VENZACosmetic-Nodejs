import { maxAgeProductLikeStorage } from '../../constants/constant.js';
import productLikeModel from '../../models/productLike.model.js';

const productLikeStorage = async (req, res, next) => {
  let productLike = null;
  const user = res.locals.user;
  const userId = user ? user._id : null;

  if (userId) {
    productLike = await productLikeModel.findOne({ user_id: userId });

    if (!productLike) {
      productLike = new productLikeModel({ user_id: userId, products: [] });
      await productLike.save();
    }

    res.cookie('productLikeId', productLike._id, {
      httpOnly: true,
      maxAge: maxAgeProductLikeStorage,
    });
  } else {
    const productLikeId = req.cookies.productLikeId;

    if (productLikeId) {
      productLike = await productLikeModel.findById(productLikeId);
    }

    if (!productLike) {
      productLike = new productLikeModel({ products: [] });
      await productLike.save();

      res.cookie('productLikeId', productLike._id, {
        httpOnly: true,
        maxAge: maxAgeProductLikeStorage,
      });
    }
  }

  res.locals.productLike = productLike;
  next();
  return;
};

const productLikeMiddleware = {
  productLikeStorage,
};

export default productLikeMiddleware;
