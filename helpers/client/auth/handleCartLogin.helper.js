import { maxAgeCartStorage } from '../../../constants/constant.js';
import cartModel from '../../../models/cart.model.js';

const handleCartLoginHelper = async (req, res, user) => {
  // Xử lý cart
  const cartId = req.cookies.cartId || null;
  let userCart = await cartModel.findOne({ user_id: user._id });
  let guestCart = null;

  if (cartId) {
    guestCart = await cartModel.findById(cartId);
  }

  if (guestCart && !guestCart.user_id) {
    if (!userCart) {
      guestCart.user_id = user._id;
      await guestCart.save();
      userCart = guestCart;
    } else {
      guestCart.products.forEach((gp) => {
        const existing = userCart.products.find((up) => up.product_id === gp.product_id);

        if (existing) {
          existing.quantity += gp.quantity;
        } else {
          userCart.products.push(gp);
        }
      });

      await userCart.save();
      await guestCart.deleteOne();
    }
  }

  if (!userCart) {
    userCart = new cartModel({ user_id: user._id, products: [] });
    await userCart.save();
  }

  res.cookie('cartId', userCart._id, { httpOnly: true, maxAge: maxAgeCartStorage });
};

export default handleCartLoginHelper;
