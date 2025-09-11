import express from 'express';
import paymentController from '../../controllers/client/payment.controller.js';
const paymentRoute = express.Router();

paymentRoute.get('/', paymentController.payment);
paymentRoute.post('/payment-create-offline', paymentController.paymentCreateOffline);
paymentRoute.get('/payment-success/:orderId', paymentController.paymentSuccess);

export default paymentRoute;
