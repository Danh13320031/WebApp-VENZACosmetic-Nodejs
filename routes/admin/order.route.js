import express from 'express';
import orderController from '../../controllers/admin/order.controller.js';

const orderRoute = express.Router();

orderRoute.get('/', orderController.order);
orderRoute.patch('/change-status/:status/:id', orderController.changeStatusOrder);
orderRoute.patch('/change-multi', orderController.changeMultiOrder);

export default orderRoute;
