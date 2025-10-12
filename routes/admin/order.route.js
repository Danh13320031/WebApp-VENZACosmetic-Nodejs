import express from 'express';
import orderController from '../../controllers/admin/order.controller.js';

const orderRoute = express.Router();

orderRoute.get('/', orderController.order);
orderRoute.patch('/order-change-status/:status/:id', orderController.changeStatusOrder);
orderRoute.patch('/payment-change-status/:status/:id', orderController.changeStatusPayment);
orderRoute.patch('/change-multi', orderController.changeMultiOrder);
orderRoute.patch('/delete/:id', orderController.deleteOrder);
orderRoute.get('/garbage', orderController.garbageOrder);
orderRoute.patch('/restore-garbage/:id', orderController.restoreOrder);
orderRoute.delete('/delete-garbage/:id', orderController.deleteGarbageOrder);
orderRoute.get('/detail/:id', orderController.detailOrder);

export default orderRoute;
