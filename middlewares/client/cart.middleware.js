import { maxAgeCartStorage } from '../../constants/cart.constant.js';
import cartModel from '../../models/cart.model.js';
import productModel from '../../models/product.model.js';

const cartStorage = async (req, res, next) => {
  try {
    if (!req.cookies.cartId) {
      const cart = new cartModel();
      await cart.save();
      res.cookie('cartId', cart._id, { expires: new Date(Date.now() + maxAgeCartStorage) });
      console.log(cart);
    } else {
      const cartId = req.cookies.cartId;
      const cart = await cartModel.findById(cartId);
      const totalQuantityProduct = cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      const totalQuantityOrder = cart.products.length;

      let productListCart = [];
      let totalPriceCart = 0;
      for (let i = 0; i < cart.products.length; i++) {
        const product = await productModel.findById(cart.products[i].product_id);
        productListCart.push(product);
        product.quantity = cart.products[i].quantity;
        totalPriceCart +=
          (product.price - (product.price * product.discount) / 100) * product.quantity;
      }
      const newTotalPriceCart = Number.parseFloat(totalPriceCart);

      // .toFixed(2)

      cart.totalQuantityProduct = totalQuantityProduct;
      cart.totalQuantityOrder = totalQuantityOrder;
      cart.productListCart = productListCart;
      cart.totalPriceOrder = newTotalPriceCart;
      res.locals.miniCart = cart;
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
