import express from 'express';
import cartController from '../../controllers/client/cart.controller.js';
const cartRoute = express.Router();

cartRoute.get('/', cartController.cart);
cartRoute.post('/add/:productId', cartController.addProductToCart);
cartRoute.patch('/delete/:productId', cartController.deleteProductInCart);
cartRoute.patch('/change-quantity/:productId/:quantity', cartController.changeProductQuantity);

export default cartRoute;
