import express from 'express';
import cartController from '../../controllers/client/cart.controller.js';
const cartRoute = express.Router();

cartRoute.get('/', cartController.cart);
cartRoute.post('/add/:productId', cartController.addProductToCart);

export default cartRoute;
