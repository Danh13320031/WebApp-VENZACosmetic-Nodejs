import express from 'express';
import cartController from '../../controllers/client/cart.controller.js';
import cartValidate from '../../validators/client/cart.validate.js';
const cartRoute = express.Router();

cartRoute.get('/', cartController.cart);
cartRoute.post('/add/:productId', cartController.addProductToCart);
cartRoute.patch('/delete/:productId', cartController.deleteProductInCart);
cartRoute.patch('/change-quantity/:productId/:quantity', cartController.changeProductQuantity);
cartRoute.patch(
  '/apply-coupon',
  cartValidate.applyCouponToCartValidate,
  cartController.applyCouponToCart
);
cartRoute.patch('/remove-coupon', cartController.removeCouponFromCart);

export default cartRoute;
