import { maxAgeCartStorage } from '../../constants/constant.js';
import cartModel from '../../models/cart.model.js';
import productModel from '../../models/product.model.js';

const cartStorage = async (req, res, next) => {
  try {
    let cart = null;
    const user = res.locals.user;
    const userId = user ? user._id : null;

    if (userId) {
      cart = await cartModel.findOne({ user_id: userId });
      
      if (!cart) {
        cart = new cartModel({ user_id: userId, products: [] });
        await cart.save();
      }

      res.cookie('cartId', cart._id, { httpOnly: true, maxAge: maxAgeCartStorage });
    } else {
      const cartId = req.cookies.cartId;

      if (cartId) {
        cart = await cartModel.findById(cartId);
      }
      if (!cart) {
        cart = new cartModel({ products: [] });
        await cart.save();
        res.cookie('cartId', cart._id, { httpOnly: true, maxAge: maxAgeCartStorage });
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
        const productData = product.toObject();
        productData.quantity = cart.products[i].quantity;
        productListCart.push(productData);
        totalPriceCart +=
          (product.price - (product.price * product.discount) / 100) * cart.products[i].quantity;
      }
    }

    cart.totalQuantityProduct = totalQuantityProduct;
    cart.totalQuantityOrder = totalQuantityOrder;
    cart.productListCart = productListCart;
    cart.totalPriceOrder = Number.parseFloat(totalPriceCart);

    res.locals.miniCart = cart;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const cartMiddleware = {
  cartStorage,
};

export default cartMiddleware;
