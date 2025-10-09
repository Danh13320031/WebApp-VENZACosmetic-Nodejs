import express from 'express';
import paymentController from '../../controllers/client/payment.controller.js';
import paymentValidate from '../../validators/client/payment.validate.js';
import authMiddleware from '../../middlewares/client/auth.middleware.js';
const paymentRoute = express.Router();

paymentRoute.get('/', paymentController.payment);
paymentRoute.post(
  '/payment-create-offline',
  authMiddleware.requireLogin,
  paymentValidate.createOfflinePaymentValidate,
  paymentController.createOfflinePayment
);
paymentRoute.get('/payment-success/:orderCode', paymentController.notifySuccessPayment);
paymentRoute.get('/payment-fail', paymentController.notifyFailPayment);

export default paymentRoute;
