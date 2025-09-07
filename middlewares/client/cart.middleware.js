import { maxAgeCartStorage } from '../../constants/cart.constant.js';
import cartModel from '../../models/cart.model.js';

const cartStorage = async (req, res, next) => {
  try {
    if (!req.cookies.cartId) {
      const cart = new cartModel();
      await cart.save();
      res.cookie('cartId', cart._id, { expires: new Date(Date.now() + maxAgeCartStorage) });
      console.log(cart);
    } else {
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const cartMiddleware = {
  cartStorage,
};

export default cartMiddleware;
