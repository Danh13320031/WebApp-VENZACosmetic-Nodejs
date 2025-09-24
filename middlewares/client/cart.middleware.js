import { maxAgeCartStorage } from '../../constants/cart.constant.js';
import cartModel from '../../models/cart.model.js';
import productModel from '../../models/product.model.js';

const cartStorage = async (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') return next(); // bỏ qua favicon

  try {
    let cart;
    const user = res.locals.user;
    const userId = user ? user._id : null;

    if (!req.cookies.cartId) {
      cart = new cartModel({ user_id: userId });
      await cart.save();
      res.cookie('cartId', cart._id, { expires: new Date(Date.now() + maxAgeCartStorage) });
    } else {
      const cartId = req.cookies.cartId;
      cart = await cartModel.findById(cartId);

      if (!cart) {
        cart = new cartModel({ user_id: userId });
        await cart.save();
        res.cookie('cartId', cart._id, { expires: new Date(Date.now() + maxAgeCartStorage) });
      }
    }

    const totalQuantityProduct = cart.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    const totalQuantityOrder = cart.products.length;

    let productListCart = [];
    let totalPriceCart = 0;

    for (let i = 0; i < cart.products.length; i++) {
      const product = await productModel.findById(cart.products[i].product_id);
      if (product) {
        productListCart.push(product);
        product.quantity = cart.products[i].quantity;
        totalPriceCart +=
          (product.price - (product.price * product.discount) / 100) * product.quantity;
      }
    }

    const newTotalPriceCart = Number.parseFloat(totalPriceCart);

    cart.totalQuantityProduct = totalQuantityProduct ? totalQuantityProduct : 0;
    cart.totalQuantityOrder = totalQuantityOrder ? totalQuantityOrder : 0;
    cart.productListCart = productListCart ? productListCart : [];
    cart.totalPriceOrder = newTotalPriceCart ? newTotalPriceCart : 0;

    res.locals.miniCart = cart;
    next();
    return;
  } catch (error) {
    console.log(error);
  }
};

const cartMiddleware = {
  cartStorage,
};

export default cartMiddleware;
