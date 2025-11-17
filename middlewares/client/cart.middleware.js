import { maxAgeCartStorage } from '../../constants/constant.js';
import cartModel from '../../models/cart.model.js';
import couponModel from '../../models/coupon.model.js';
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

    // Handle cart list and cart total
    let productListCart = [];
    let totalPriceCart = 0;

    for (let i = 0; i < cart.products.length; i++) {
      const product = await productModel.findOne({
        _id: cart.products[i].product_id,
        deleted: false,
        status: 'active',
      });

      if (product) {
        const productData = product.toObject();
        productData.quantity = cart.products[i].quantity;
        productListCart.push(productData);
        totalPriceCart +=
          (product.price - (product.price * product.discount) / 100) * cart.products[i].quantity;
      } else {
        cart.products.splice(i, 1);
        await cart.save();
      }
    }

    const totalQuantityProduct = cart.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    const totalQuantityOrder = cart.products.length;

    cart.totalQuantityProduct = totalQuantityProduct;
    cart.totalQuantityOrder = totalQuantityOrder;
    cart.productListCart = productListCart;
    cart.totalPriceOrder = Number.parseFloat(totalPriceCart);
    cart.total = cart.totalPriceOrder;

    // Handle cart with coupon
    if (cart.coupon_id) {
      const coupon = await couponModel.findOne({
        _id: cart.coupon_id,
        deleted: false,
        status: 'active',
        published: true,
      });

      let couponDiscount = 0;

      if (!coupon) {
        cart.coupon_id = null;
        cart.couponAmount = 0;
        cart.finalTotal = cart.total;
      } else {
        if (coupon.valueType === 'percent') {
          couponDiscount = (cart.total * coupon.value) / 100;

          couponDiscount > coupon.maxDiscountAmount
            ? (couponDiscount = coupon.maxDiscountAmount)
            : couponDiscount;
        }

        if (coupon.valueType === 'amount') couponDiscount = coupon.value;

        if (cart.total < coupon.minAmount) {
          cart.coupon_id = null;
          cart.couponAmount = 0;
          cart.finalTotal = cart.total;
        } else {
          cart.couponAmount = couponDiscount;
          cart.finalTotal = cart.total - couponDiscount === 0 ? 0 : cart.total - couponDiscount;
        }
      }
    } else {
      cart.coupon_id = null;
      cart.couponAmount = 0;
      cart.finalTotal = cart.total;
    }

    await cart.save();

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
