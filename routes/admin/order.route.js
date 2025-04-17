import express from 'express';
import orderController from '../../controllers/admin/order.controller.js';

const orderRoute = express.Router();

orderRoute.get('/', orderController.order);

export default orderRoute;
