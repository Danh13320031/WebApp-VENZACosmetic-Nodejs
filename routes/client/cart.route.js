import express from 'express';
import cartController from '../../controllers/client/cart.controller.js';
const cartRoute = express.Router();

cartRoute.post('/add/:productId', cartController.addProductToCart);

export default cartRoute;
